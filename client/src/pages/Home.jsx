import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../features/products/productApiSlice";
import ProductCard from "../components/ProductCard";
import LeadForm from "../components/forms/LeadForm";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const { user, authReady } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetProductsQuery();
  const products = data?.data || [];
  // const products = []; // For testing empty state

  if (!authReady) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a95d] mx-auto mb-4"></div>
        <p className="text-white text-lg">Waiting for auth...</p>
      </div>
    </div>
  );

  // When there are no products, show only the countdown and coming soon card
  if (products.length === 0) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-black/70 backdrop-blur-md border border-[#d5b56e] rounded-2xl p-8 sm:p-12 mx-auto shadow-lg shadow-[#d5b56e]/20">
            <div className="mb-8 text-center">
              <h3 className="text-3xl font-bold text-[#d5b56e] mb-4">
                Something Amazing is Coming
              </h3>
              <p className="text-white/90 text-lg mb-6">
                We're preparing an exclusive collection just for you. Be the first to know when we launch!
              </p>
              
              {/* Centered Countdown Timer */}
              <div className="flex justify-center mb-8">
                <CountdownTimer />
              </div>
              
              <div className="flex justify-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-[#d5b56e] rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-[#d5b56e] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-[#d5b56e] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-[#d5b56e]/20">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal render when products exist
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-[#dda92f]">Welcome to </span>
              <span className="text-[#dda92f] font-extrabold">ceenami</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Discover premium products crafted with excellence and style
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c9a95d] to-yellow-600 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-16">
            <div className="inline-block bg-white bg-opacity-10 backdrop-blur-md rounded-full px-8 py-4 border border-[#c9a95d] border-opacity-30">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
                Featured Products
              </h2>
              <div className="w-16 h-0.5 bg-[#c9a95d] mx-auto"></div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9a95d]"></div>
                <p className="text-white text-lg">Loading amazing products...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-8 max-w-md mx-auto">
                <p className="text-red-300 text-lg">Failed to load products</p>
                <p className="text-red-400 text-sm mt-2">Please try refreshing the page</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {products.map((product) => product && product._id && (
                <div key={product._id} className="transform transition-all duration-300 hover:scale-105">
                  <ProductCard product={product} isLoggedIn={!!user} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-[#c9a95d] via-yellow-500 to-[#c9a95d]"></div>
    </div>
  );
}