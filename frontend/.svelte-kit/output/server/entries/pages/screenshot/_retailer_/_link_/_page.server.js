import { s as supabaseClient } from "../../../../../chunks/supabase.js";
const load = async ({ locals, params }) => {
  if (!locals.session) {
    throw redirect(303, "/login");
  }
  const listScreenshots = async () => {
    try {
      const { data, error } = await supabaseClient.storage.from("screenshots").list();
      if (error) {
        console.log("Error occured while listing screenshots legacy: ", error.message);
      }
      if (data) {
        for (let image of data) {
          const { data: data2, error: error2 } = await supabaseClient.storage.from("screenshots").remove([image.name]);
          if (error2) {
            console.log("Error occured while deleting screenshots legacy: ", error2.message);
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  await listScreenshots();
  const pushToStorage = async () => {
    const response = await fetch(`https://pricezag.com/screenshot/${params.retailer}/${params.link}`);
    const buffer = await response.arrayBuffer();
    const { data, error } = await supabaseClient.storage.from("screenshots").upload(`${params.retailer}-${params.link}`, buffer);
    if (error) {
      console.log(error);
    }
    const imgName2 = `${params.retailer}-${params.link}`;
    return imgName2;
  };
  const imgName = await pushToStorage();
  const getScreenshotFromStorage = async (imgName2) => {
    let url;
    try {
      const { data, error } = await supabaseClient.storage.from("screenshots").getPublicUrl(`${imgName2}`);
      if (error) {
        throw error;
      }
      url = data.publicUrl;
    } catch (error) {
      console.log("Error downloading screenshot: ", error.message);
    }
    return url;
  };
  const imgUrl = await getScreenshotFromStorage(imgName);
  return { params, imgUrl, imgName };
};
export {
  load
};
