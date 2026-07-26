"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
    id: string;
    name: string;
    price: number;
    image?: string;
    currency?: string;
    qty: number;
};

type CartContextValue = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'qty'>) => void;
    updateQty: (id: string, qty: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('cart');
            if (raw) setItems(JSON.parse(raw));
        } catch (e) { }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(items));
        } catch (e) { }
    }, [items]);

    const addToCart = (item: Omit<CartItem, 'qty'>) => {
        setItems((prev) => {
            const found = prev.find((p) => p.id === item.id);
            if (found) {
                return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((p) => p.id !== id));
    };

    const updateQty = (id: string, qty: number) => {
        setItems((prev) => {
            if (qty <= 0) return prev.filter((p) => p.id !== id);
            return prev.map((p) => (p.id === id ? { ...p, qty } : p));
        });
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((s, it) => s + it.qty, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, updateQty, removeFromCart, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}

export default CartProvider;
