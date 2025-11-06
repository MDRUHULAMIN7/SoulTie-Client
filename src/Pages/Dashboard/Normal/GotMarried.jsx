import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import img from "../../../images/got ma.png";
import Heading from "../Sidebar/Heading";
import Swal from "sweetalert2";
import { User, Heart, X, Image as ImageIcon } from "lucide-react";

const GotMarried = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const [userImage, setUserImage] = useState(null);
  const [partnerImage, setPartnerImage] = useState(null);
  const [combinedPreview, setCombinedPreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  const { data: mydata = [], refetch } = useQuery({
    queryKey: ["mydata"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/view-biodatas/${user?.email}`);
      return res.data;
    },
  });

  const image_host_key = import.meta.env.VITE_IMAGE_API;
  const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

  // Function to handle image upload
  const handleImageUpload = (file, type) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === "user") {
        setUserImage(e.target.result);
      } else {
        setPartnerImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Use useEffect to generate combined preview when both images are available
  useEffect(() => {
    if (userImage && partnerImage) {
      generateCombinedPreview();
    } else {
      setCombinedPreview(null);
    }
  }, [userImage, partnerImage]);

  // Function to combine two images into one
  const generateCombinedPreview = () => {
    if (!userImage || !partnerImage) return;

    setIsGenerating(true);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 320;

    // Create a beautiful gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#fecdd3");
    gradient.addColorStop(0.5, "#fda4af");
    gradient.addColorStop(1, "#fb7185");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const circleRadius = 75;
    const circleCenterY = 130;
    const overlap = 0;
    const leftCircleX = 160 - circleRadius + overlap / 2;
    const rightCircleX = 160 + circleRadius - overlap / 2;

    // Load user image
    const img1 = new Image();
    img1.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(leftCircleX, circleCenterY, circleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      const size = circleRadius * 2;
      ctx.drawImage(
        img1,
        leftCircleX - circleRadius,
        circleCenterY - circleRadius,
        size,
        size
      );
      ctx.restore();

      // Load partner image
      const img2 = new Image();
      img2.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(rightCircleX, circleCenterY, circleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        const size = circleRadius * 2;
        ctx.drawImage(
          img2,
          rightCircleX - circleRadius,
          circleCenterY - circleRadius,
          size,
          size
        );
        ctx.restore();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(leftCircleX, circleCenterY, circleRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rightCircleX, circleCenterY, circleRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText("Together Forever 💕", 160, 270);
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        setCombinedPreview(canvas.toDataURL("image/jpeg", 0.9));
        setIsGenerating(false);
      };
      img2.onerror = () => {
        console.error("Error loading partner image");
        setIsGenerating(false);
      };
      img2.src = partnerImage;
    };
    img1.onerror = () => {
      console.error("Error loading user image");
      setIsGenerating(false);
    };
    img1.src = userImage;
  };

  // Function to upload combined image to imgbb
  const uploadCombinedImage = async () => {
    if (!combinedPreview) {
      throw new Error("No combined preview available");
    }

    try {
      const response = await fetch(combinedPreview);
      const blob = await response.blob();
      const file = new File([blob], "couple-image.jpg", { type: "image/jpeg" });

      const imageFiles = new FormData();
      imageFiles.append("image", file);

      const res = await axiosPublic.post(image_host_api, imageFiles, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data && res.data.data && res.data.data.url) {
        return res.data.data.url;
      } else {
        throw new Error("Invalid response from image upload");
      }
    } catch (error) {
      console.error("Error uploading combined image:", error);
      throw error;
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!userImage || !partnerImage) {
      Swal.fire({
        icon: "warning",
        title: "Images Required",
        text: "Please upload both your photo and partner photo",
        background: "#fff1f2",
        confirmButtonColor: "#f43f5e",
      });
      return;
    }

    if (!combinedPreview) {
      Swal.fire({
        icon: "warning",
        title: "Processing Images",
        text: "Please wait while we process your images",
        background: "#fff1f2",
        confirmButtonColor: "#f43f5e",
      });
      return;
    }

    try {
      setIsGenerating(true);

      // Upload combined image
      const coupleImageUrl = await uploadCombinedImage();

      const yourBiodataId = e.target.yourbiodataid.value;
      const partnerBiodataId = e.target.partnerbiodataid.value;
      const rating = e.target.rating.value;
      const story = e.target.text.value;

      const marriageData = {
        SelfBiodata: yourBiodataId,
        PartnerBiodata: partnerBiodataId,
        Coupleimage: coupleImageUrl,
        shortStory: story,
        Ratings: parseInt(rating),
        status: "married",
        createdAt: new Date(),
      };

      const res2 = await axiosPublic.post("/success", marriageData);
      if (res2.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success Story Shared!",
          text: "Thank you for sharing your beautiful journey with us",
          showConfirmButton: false,
          timer: 3000,
          background: "#fff1f2",
          iconColor: "#f43f5e",
        });

        setUserImage(null);
        setPartnerImage(null);
        setCombinedPreview(null);
        e.target.reset();
        refetch();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Submission Issue",
          text: res2.data.message || "There was an issue with your submission",
          background: "#fff1f2",
          confirmButtonColor: "#f43f5e",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response?.status === 409) {
        const errorData = error.response.data;
        let errorMessage = errorData.message;
        if (errorData.existingEntry) {
          errorMessage += `\n\nYour biodata ${errorData.existingEntry.selfBiodata} is already paired with biodata ${errorData.existingEntry.partnerBiodata}`;
          errorMessage += `\nSubmitted on: ${new Date(
            errorData.existingEntry.createdAt
          ).toLocaleDateString()}`;
        }

        if (errorData.existingStory) {
          errorMessage += `\n\nThis biodata is already part of another success story.`;
          if (errorData.existingStory.withBiodata) {
            errorMessage += `\nAlready paired with biodata: ${errorData.existingStory.withBiodata}`;
          }
        }

        Swal.fire({
          icon: "warning",
          title: "Already Exists",
          html: `
          <div class="text-left">
            <p class="mb-3">${errorData.message}</p>
            ${
              errorData.existingEntry
                ? `
              <div class="bg-rose-50 p-3 rounded-lg border border-rose-200">
                <p class="text-sm font-semibold text-rose-700">Existing Pair:</p>
                <p class="text-sm">Biodata ${
                  errorData.existingEntry.selfBiodata
                } + Biodata ${errorData.existingEntry.partnerBiodata}</p>
                <p class="text-xs text-rose-600 mt-1">Submitted: ${new Date(
                  errorData.existingEntry.createdAt
                ).toLocaleDateString()}</p>
              </div>
            `
                : ""
            }
            ${
              errorData.existingStory
                ? `
              <div class="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-2">
                <p class="text-sm font-semibold text-amber-700">Note:</p>
                <p class="text-sm">Each biodata can only be part of one success story.</p>
              </div>
            `
                : ""
            }
          </div>
        `,
          background: "#fff1f2",
          confirmButtonColor: "#f43f5e",
          confirmButtonText: "Understand",
          width: "500px",
        });
      } else if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Missing Information",
          text:
            error.response.data.message || "Please fill in all required fields",
          background: "#fff1f2",
          confirmButtonColor: "#f43f5e",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            error.response?.data?.message ||
            "There was an error sharing your story. Please try again.",
          background: "#fff1f2",
          confirmButtonColor: "#f43f5e",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const removeImage = (type) => {
    if (type === "user") {
      setUserImage(null);
    } else {
      setPartnerImage(null);
    }
    setCombinedPreview(null);
  };

  return (
    <div className="">
      <Heading
        subheading={"Share your beautiful journey and inspire others"}
        heading={"Share Your Success Story"}
      />

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden lg:flex gap-8 p-6 border border-rose-100">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl">
          {combinedPreview ? (
            <div className="w-full">
              <img
                src={combinedPreview}
                alt="Combined couple preview"
                className="w-full rounded-xl border-4 border-white shadow-lg"
              />
              <div className="text-center mt-4">
                <Heart
                  className="w-8 h-8 text-rose-500 mx-auto mb-2"
                  fill="#f43f5e"
                />
                <p className="text-rose-600 font-medium">
                  Your Beautiful Story
                </p>
              </div>
            </div>
          ) : (
            <>
              <img
                className="w-full max-w-sm"
                src={img}
                alt="Happy couple illustration"
              />
              <div className="text-center mt-6">
                <Heart
                  className="w-12 h-12 text-rose-500 mx-auto mb-3"
                  fill="#f43f5e"
                />
                <h3 className="text-2xl font-bold text-rose-700 mb-2">
                  Share Your Happiness
                </h3>
                <p className="text-rose-600">
                  Your story can inspire others to find their perfect match
                </p>
              </div>
            </>
          )}
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-3/5">
          <form onSubmit={handleForm} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-rose-700 mb-2">
                  Your Biodata ID
                </label>
                <input
                  type="number"
                  readOnly
                  value={mydata.biodataId}
                  name="yourbiodataid"
                  className="w-full px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-rose-700 mb-2">
                  Partner's Biodata ID
                </label>
                <input
                  type="number"
                  placeholder="Enter partner's biodata ID"
                  required
                  name="partnerbiodataid"
                  className="w-full px-4 py-3 bg-white border border-rose-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-rose-700 mb-2">
                Upload Photos
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center">
                  <div
                    className={`border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all ${
                      userImage
                        ? "border-rose-400 bg-rose-50"
                        : "border-rose-300 hover:border-rose-400"
                    }`}
                    onClick={() => fileInputRef1.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef1}
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0], "user")
                      }
                      className="hidden"
                      accept="image/*"
                    />
                    {userImage ? (
                      <div className="relative">
                        <img
                          src={userImage}
                          alt="Your photo"
                          className="w-32 h-32 rounded-full mx-auto object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage("user");
                          }}
                          className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-rose-400">
                        <User className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">Your Photo</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all ${
                      partnerImage
                        ? "border-rose-400 bg-rose-50"
                        : "border-rose-300 hover:border-rose-400"
                    }`}
                    onClick={() => fileInputRef2.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef2}
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0], "partner")
                      }
                      className="hidden"
                      accept="image/*"
                    />
                    {partnerImage ? (
                      <div className="relative">
                        <img
                          src={partnerImage}
                          alt="Partner photo"
                          className="w-32 h-32 rounded-full mx-auto object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage("partner");
                          }}
                          className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-rose-400">
                        <User className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">Partner's Photo</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Combined Preview - Mobile Only */}
              {combinedPreview && (
                <div className="lg:hidden text-center p-4 bg-rose-50 rounded-2xl border border-rose-200">
                  <label className="block text-sm font-semibold text-rose-700 mb-3">
                    Combined Preview
                  </label>
                  <img
                    src={combinedPreview}
                    alt="Combined couple preview"
                    className="max-w-full h-auto rounded-xl mx-auto border-2 border-rose-300"
                  />
                  <p className="text-xs text-rose-600 mt-2">
                    This combined image will be saved in our database
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="text-center p-4 bg-rose-50 rounded-2xl border border-rose-200">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-2"></div>
                  <p className="text-sm text-rose-600">
                    Generating combined image...
                  </p>
                </div>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-rose-700 mb-2">
                Rate Your Experience
              </label>
              <select
                name="rating"
                className="w-full px-4 py-3 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select your rating
                </option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
                <option value="4">⭐⭐⭐⭐ Very Good (4)</option>
                <option value="3">⭐⭐⭐ Good (3)</option>
                <option value="2">⭐⭐ Fair (2)</option>
                <option value="1">⭐ Poor (1)</option>
              </select>
            </div>

            {/* Story */}
            <div>
              <label className="block text-sm font-semibold text-rose-700 mb-2">
                Share Your Love Story
              </label>
              <textarea
                name="text"
                rows="4"
                required
                placeholder="Tell us about your journey, how you met, and what makes your relationship special..."
                className="w-full px-4 py-3 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isGenerating || !userImage || !partnerImage || !combinedPreview
              }
              className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-500 hover:to-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Your Story...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" fill="white" />
                  <span>Share Success Story</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GotMarried;
