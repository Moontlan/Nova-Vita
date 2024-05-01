"use client";
import { storage } from "../../lib/firebase.js";
import { ref, uploadBytes, listAll, deleteObject } from "firebase/storage";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function CampForm() {
  const params = useSearchParams();
  const [imagenesCarrucel, setImagenesCarrucel] = useState(null);
  const [campaignId, setCampaignId] = useState(null);
  const [camp, setCampaign] = useState({});
  const [formValues, setFormValues] = useState({
    campaignName: "",
    description: "",
    beneficiaryType: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  useEffect(() => {
    const id = params.get("id");
    setCampaignId(id);

    fetch(`http://localhost:3000/api/test/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCampaign(data.campaign);
        setFormValues({
          idInstitution: data.campaign.idInstitution,
          campaignName: data.campaign.campaignName,
          description: data.campaign.description,
          beneficiaryType: data.campaign.beneficiaryType,
          startDate: data.campaign.startDate,
          endDate: data.campaign.endDate,
          status: data.campaign.status,
        });
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // Método para eliminar todas las imágenes que comiencen con "18A"
  const deleteImagesStartingWith = async () => {
    try {
      const imagesRef = ref(storage, "/"); // Ruta raíz de Firebase Storage

      const imageList = await listAll(imagesRef);

      const imagesToDelete = imageList.items.filter((item) =>
        item.name.startsWith(`${campaignId}A`)
      ); // Filtra las imágenes que comiencen con "18A"

      const deletePromises = imagesToDelete.map((item) => deleteObject(item));

      await Promise.all(deletePromises);

      confirm("Imágenes eliminadas correctamente");
    } catch (error) {
      confirm("Error al eliminar imágenes:", error);
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el cambio de imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:3000/api/campaigns/updateCampaignByCampaignID/${campaignId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        deleteImagesStartingWith()
        confirm(imagenesCarrucel.length)
        console.log("Datos enviados exitosamente:", data);
        for (let i = 0; i < imagenesCarrucel.length; i++) {
          const imageRef = ref(storage, `${campaignId}A-${i}.jpg`);
          uploadBytes(imageRef, imagenesCarrucel[i]);
        }
        confirm("Datos actualizados exitosamente");
      })
      .catch((error) => {
        confirm(error.message);
      });
  };

  return (
    <form
      class="pb-10 pt-10 flex flex-col items-center justify-center bg-white"
      onSubmit={handleSubmit}
    >
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Registro de Campaña
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
              <label
                for="street-address"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre de la Campaña
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="campaignName"
                  id="campaignName"
                  value={formValues.campaignName}
                  onChange={handleChange}
                  class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Descripcion
              </label>
              <div class="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Tipo de Beneficiario
              </label>
              <div class="mt-2">
                <input
                  id="beneficiaryType"
                  name="beneficiaryType"
                  value={formValues.beneficiaryType}
                  onChange={handleChange}
                  class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="cover-photo"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Imagen
              </label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept=".jpg"
                      onChange={(event) =>
                        setImagenesCarrucel(event.target.files)
                      }
                      class="pl-3 sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="region"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha Inicio
              </label>
              <div class="mt-2">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formValues.startDate}
                  onChange={handleChange}
                  autocomplete="address-level1"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="postal-code"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha Fin
              </label>
              <div class="mt-2">
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formValues.endDate}
                  onChange={handleChange}
                  autocomplete="postal-code"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}

export default CampForm;
