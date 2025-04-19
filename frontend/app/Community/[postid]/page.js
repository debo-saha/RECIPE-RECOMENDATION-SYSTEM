"use client";

import React, { use, useEffect, useState } from "react";
import { usePostStore } from "@/store/recipePostsStore";
import { ImageKitProvider, IKImage } from "imagekitio-next";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShape from "@/components/FloatingShape";

// Validate environment variables
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
if (!publicKey || !urlEndpoint) {
  throw new Error(
    "Missing ImageKit configuration. Check environment variables."
  );
}

export default function Page({ params }) {
  const [isOpen, setIsOpen] = useState(true);
  const { postid } = use(params);
  const { posts, fetchPosts, isLoading, error } = usePostStore();
  const matchedPost = posts.find((post) => String(post._id) === String(postid));

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) throw new Error(await response.text());
      return await response.json();
    } catch (error) {
      console.error("ImageKit Authentication Failed:", error);
      return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-labelledby="recipe-dialog-title"
        >
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingShape
              color="bg-green-400/20"
              size="w-64 h-64"
              top="10%"
              left="15%"
              delay={0}
            />
            <FloatingShape
              color="bg-emerald-400/20"
              size="w-48 h-48"
              top="70%"
              left="80%"
              delay={0.4}
            />
            <FloatingShape
              color="bg-lime-400/20"
              size="w-32 h-32"
              top="40%"
              left="90%"
              delay={0.8}
            />
          </div>

          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
            >
              {/* Header Section */}
              <div className="p-6 flex justify-between items-start bg-emerald-50 dark:bg-gray-800">
                <div>
                  <h2 
                    id="recipe-dialog-title"
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {matchedPost?.recipe_name}
                  </h2>
                  {matchedPost?.cuisine_type && (
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">
                      {matchedPost.cuisine_type} Cuisine
                    </span>
                  )}
                </div>
                
                <Link href="/Community" passHref>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </motion.button>
                </Link>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                    Error loading recipe: {error}
                  </div>
                )}

                {isLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg" />
                    <div className="h-24 bg-gray-200 rounded-lg" />
                  </div>
                ) : matchedPost ? (
                  <>
                    {/* Image Section */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
                    >
                      {matchedPost.recipe_image_url ? (
                        <IKImage
                          path={matchedPost.recipe_image_url}
                          transformation={[{
                            quality: "80",
                            format: "auto",
                            height: 600,
                            width: 800,
                            focus: "auto"
                          }]}
                          alt={matchedPost.recipe_name || "Recipe visual"}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          No image available
                        </div>
                      )}
                    </motion.div>

                    {/* Process Section */}
                    <motion.div
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="prose dark:prose-invert max-w-none"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-emerald-600 dark:text-emerald-400">
                        Cooking Instructions
                      </h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                          {matchedPost.recipe_process}
                        </p>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Recipe not found
                  </div>
                )}
              </div>
            </motion.div>
          </ImageKitProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}