"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

function Donors() {
  const params = useSearchParams();
  const [donors, setDonors] = useState([]);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const ChargeDonations = (id) => {
    confirm("entre");
    router.push(`/Donors?id=${id}`);
    //router.reload();
    //router.refresh();
    //router.back();
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/reports/getAllDonationsDescendendByCampaignID/${params.get(
        "id"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDonors(data.donations);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const updateDonationStatus = (id, texto, idcam) => {
    confirm(id);
    //confirm(texto);
    confirm(idcam);
    // Indica que la actualización está en curso
    setUpdating(true);

    // Realiza la llamada a la API para actualizar el estado de la donación
    fetch(
      `http://localhost:3000/api/campaigns/updateDonationStatusByDonationID/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: texto }), // Puedes ajustar los datos que necesitas enviar
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes realizar acciones adicionales después de la actualización
        console.log("Actualización exitosa:", data);
        //confirm("Todo bien :D");

        // Actualiza el estado de la donación en la tabla
        const updatedData = donors.map((donor) => {
          if (donor.id === id) {
            return {
              ...donor,
              status: texto,
            };
          } else {
            return donor;
          }
        });

        setUpdatedDonors(updatedData);
      })
      .catch((error) => {
        // Manejo de errores en caso de que la actualización falle
        console.error("Error al actualizar:", error);
        //confirm("odio mi vida");
      })
      .finally(() => {
        // Indica que la actualización ha terminado
        setUpdating(false);
      });
    //ChargeDonations(idcam);
  };

  return (
    <div>

      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-4 font-medium text-gray-900 text-center"
              >
                Benefactor
              </th>
              <th
                scope="col"
                class="px-6 py-4 font-medium text-gray-900 text-center"
              >
                Estado
              </th>
              <th
                scope="col"
                class="px-6 py-4 font-medium text-gray-900 text-center"
              >
                Descripcion
              </th>
              <th
                scope="col"
                class="px-6 py-4 font-medium text-gray-900 text-center"
              >
                Cantidad
              </th>
              <th
                scope="col"
                class="px-6 py-4 font-medium text-gray-900 text-center"
              >
                Fecha de Donacion
              </th>
              <th
                scope="col"
                class="px-6 py-4 font-medium text-gray-900 text-center"
              >
                Fecha/Hora de Recojo
              </th>
              <th
                scope="col"
                class="px-6 py-4 font-medium text-gray-900 text-center"
              >
                Actualizar estado!
              </th>
            </tr>
          </thead>
          <tbody>
            {donors.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <h1 className="text-center">
                    No hay donaciones en la campaña
                  </h1>
                </td>
              </tr>
            ) : (
              donors.map((d) => (
                <tr className="hover:bg-gray-50" key={d.id}>
                  <td className="px-6 py-4 text-center">{d.Name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{d.description}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                      {d.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{d.donationDate}</td>
                  <td className="px-6 py-4 text-center">
                    {d.pickupDateTime.slice(0, 10)} |{" "}
                    {d.pickupDateTime.slice(11, 16)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full m-2"
                      onClick={() =>
                        updateDonationStatus(d.id, "EN CAMINO", d.campaign_id)
                      }
                      disabled={updating}
                    >En camino</button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full m-2"
                      onClick={() =>
                        updateDonationStatus(d.id, "RECIBIDO", d.campaign_id)
                      }
                      disabled={updating}
                    >Entregado</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donors;