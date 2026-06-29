import { Mod } from "@/app/models";
import axios from "axios";

export const handleDownloadAll = async (mods: Mod[], collectionName: string) => {
    try {
      const createZip = await axios.post("/api/zip", {
        files: mods.map(mod => ({
          url: mod.file,
          filename: `${mod.title}.zip`
        })),

        expires_in: 500,
      });

      const createdData = createZip.data;
      const jobId = createdData.job_id;

      let job;

      while (true) {
        const result = await axios.get(`/api/zip?jobId=${jobId}`);
        const data = result.data;

        if (data.job.status === "completed") {
          job = data.job;
          break;
        }

        if (data.job.status === "failed") {
          throw new Error("Error while generating ZIP");
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const zipUrl = job.zips[0].download_url;

      // Lo convertí a blob para poder colocarle nombre al zip, ya que
      // por la API de EaZip se colocaba como nombre el id del job asignado
      const downloadResponseBlob = await axios.get(zipUrl, {
        responseType: "blob",
      });

      const blobUrlForZip = window.URL.createObjectURL(downloadResponseBlob.data);

      const link = document.createElement("a");
      link.href = blobUrlForZip;
      link.download = `${collectionName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrlForZip);
    } catch (error) {
      console.error(error);
    }
  };