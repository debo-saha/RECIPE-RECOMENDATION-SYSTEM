"use client";
import { Plus } from "lucide-react";
import { usePostStore } from "@/store/recipePostsStore";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { useRouter } from "next/navigation";


const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!publicKey || !urlEndpoint) {
  throw new Error("Missing ImageKit public key or URL endpoint");
}

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Card = () => {
  const { fetchPosts, createPost } = usePostStore();
  const router = useRouter();
  const [form, setForm] = useState({
    recipe_name: "",
    recipe_process: "",
    creator: "",
    recipe_tags: "",
    recipe_image_url: "",
  });

  const fetchPostsMemoized = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPostsMemoized();
  }, [fetchPostsMemoized]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.recipe_image_url) {
        alert("Please upload an image first.");
        return;
      }

      await createPost(
        form.recipe_name,
        form.recipe_process,
        form.creator,
        form.recipe_tags,
        form.recipe_image_url
      );
      router.push("/Community");
      setForm({
        recipe_name: "",
        recipe_process: "",
        creator: "",
        recipe_tags: "",
        recipe_image_url: "",
      });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const ikUploadRef = useRef(null);

  const onUploadSuccess = (res) => {
    console.log("Upload Success:", res);
    setPreviewImage(res.url);
    setUploadedFile({ url: res.url, fileId: res.fileId });

    // Extract path and update form
    const extractedPath = res.url.split(urlEndpoint)[1];
    setForm((prevForm) => ({
      ...prevForm,
      recipe_image_url: extractedPath,
    }));
  };

  const onUploadError = (err) => console.error("Upload Error:", err);

  const cancelUpload = () => {
    setPreviewImage(null);
    setUploadedFile(null);
    setForm((prev) => ({ ...prev, recipe_image_url: "" }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center p-4">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Form Column */}
              <div className="p-8 md:p-12">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                  Share Your Recipe
                </h1>
                
                <div className="space-y-6">
                  {/* Image Upload Section */}
                  <div className="mb-8">
                    <ImageKitProvider
                      publicKey={publicKey}
                      urlEndpoint={urlEndpoint}
                      authenticator={authenticator}
                    >
                      {!previewImage ? (
                        <div className="border-4 border-dashed border-blue-100 rounded-2xl p-6 text-center hover:border-blue-200 transition-colors">
                          <IKUpload
                            fileName="recipe-upload.jpg"
                            useUniqueFileName
                            validateFile={(file) => file && file.size < 2000000}
                            folder="/recipe-images"
                            onError={onUploadError}
                            onSuccess={onUploadSuccess}
                            ref={ikUploadRef}
                            style={{ display: "none" }}
                          />
                          <button
                            className="w-full py-12 flex flex-col items-center justify-center"
                            onClick={(e) => {
                              e.preventDefault();
                              ikUploadRef.current?.click();
                            }}
                          >
                            <Plus className="w-16 h-16 text-blue-400 mb-4" />
                            <span className="text-lg font-semibold text-blue-600">
                              Upload Recipe Image
                            </span>
                            <p className="text-gray-400 mt-2">
                              JPEG or PNG (max 2MB)
                            </p>
                          </button>
                        </div>
                      ) : (
                        <div className="relative group">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={cancelUpload}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-red-600 hover:bg-white transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </ImageKitProvider>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4">
                    <input
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      type="text"
                      name="creator"
                      value={form.creator}
                      onChange={handleChange}
                      required
                      placeholder="👩🍳 Your Name"
                    />
                    <input
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      type="text"
                      name="recipe_tags"
                      value={form.recipe_tags}
                      onChange={handleChange}
                      required
                      placeholder="🏷️ Tags (e.g., Italian, Vegetarian, Quick)"
                    />
                    <input
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      type="text"
                      name="recipe_name"
                      value={form.recipe_name}
                      onChange={handleChange}
                      required
                      placeholder="🍴 Recipe Name"
                    />
                    <textarea
                      name="recipe_process"
                      value={form.recipe_process}
                      onChange={handleChange}
                      placeholder="📝 Step-by-Step Instructions..."
                      required
                      rows="5"
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                  >
                    Share Recipe with Community 🎉
                  </button>
                </div>
              </div>

              {/* Right Image Column */}
              <div className="hidden lg:block relative bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <img
                    src="https://img.freepik.com/free-photo/happy-male-chef-preparing-vegetables-pan_637285-9526.jpg?t=st=1717226871~exp=1717230471~hmac=5c4e3b4a1d0a4e7a7f1d3e3b3e3b3e3b3e3b3e3b3e3b3e3b3e3b3e3b3e3b3e3b3&w=1380"
                    alt="Happy Chef Cooking"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute bottom-8 left-8 right-8 text-center bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Share Your Culinary Creativity!
                  </h2>
                  <p className="text-gray-600">
                    Join our community of food lovers and inspire others with your
                    unique recipes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Card;
