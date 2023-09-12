import React, { useEffect, useState } from "react";
import { addBannerApi, fetchBannerApi } from "../../../services/adminAPI";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const bannerData = await fetchBannerApi();
      setBanners(bannerData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBanner = async (e) => {
    e.preventDefault();
    try {
      const newBanners = await addBannerApi({ newBanner });
      setBanners([...banners, newBanners]);
      setNewBanner(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div class=" w-full p-4">
  <h1 class="text-3xl font-bold">Banner Management</h1>
  <div class="mt-4">
    <h2 class="text-xl font-semibold">Add New Banner</h2>
    <input
      name="newBanner"
      type="file"
      class="mt-2 p-2 border rounded"
      onChange={(e) => setNewBanner(e.target.files[0])}
    />
    <button
      class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={handleAddBanner}
    >
      Upload Banner
    </button>
  </div>
  <div class="mt-8">
    <h2 class="text-xl font-semibold">Existing Banners</h2>

    {loading ? (
      <p>Loading....</p>
    ) : (
      <div>
        {banners.map((banner) => {
          const imageUrl = `http://localhost:3000/vehicleImages/${banner.bannerImage}`;
          return (
            <div
              class="flex justify-between items-center py-2 px-4 border-b"
              key={banner._id}
            >
              <div class="w-2/6">
                <img src={imageUrl} class="w-12 h-12" alt="Banner" />
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>

    </>
  );
};

export default Banners;
