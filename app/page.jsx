import Image from "next/image";

export default function Home() {
  return (
      <div class="relative overflow-hidden bg-white">
        <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div class="sm:max-w-lg">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Nova-Vita
              </h1>
              <p class="mt-4 text-xl text-gray-500">
              "Un refugio acogedor que abraza con calidez, donde las experiencias se entrelazan con sabiduría y las sonrisas encuentran su hogar en cada recuerdo compartido."
              </p>
            </div>
            <div>
              <div class="mt-10">
                <div
                  aria-hidden="true"
                  class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div class="flex items-center space-x-6 lg:space-x-8">
                      <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://www.residencialasmatas.es/wp-content/uploads/2017/08/37893895_ml.jpg"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://casadereposobugambilias.com/wp-content/uploads/2019/06/beneficios_asilo_ancianos.jpg"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.nia.nih.gov/sites/default/files/inline-images/physical-therapist-woman-daughter-walking-inline.jpg"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.necsy.it/wp-content/uploads/2016/12/iStock-520061452_big-418x315.jpg"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.esan.edu.pe/images/blog/2019/05/13/1200x630-mba-asilos.jpg"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://f.i.uol.com.br/fotografia/2020/03/30/15856022915e825ef38263f_1585602291_3x2_md.jpg"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://prefcg-repositorio.campogrande.ms.gov.br/wp-cdn/uploads/sites/3/2019/09/Visita_idosos_2-768x432.jpg"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/Login"
                  class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Login
                </a>
                <a
                  href="NursingHome"
                  class=" ml-4 inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Registrate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
