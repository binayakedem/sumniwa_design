"use client";

import React from 'react';
import { CartProvider } from './cart-context';

export default function CartProviderWrapper({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
}
