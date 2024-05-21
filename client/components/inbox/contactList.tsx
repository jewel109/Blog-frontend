"use client"

import Link from "next/link"

export const ContactList: React.FC = () => {

  return (
    <div className="hidden md:flex md:flex-col max-w-lg p-4 py-6 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="flex items-center justify-between mb-4 ">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-gray-400">Latest Chats</h5>
        <Link href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </Link>

      </div>

      <div className="flow-root py-8  ">
        <ul className="divide-y  divide-gray-200 dark:divide-gray-700 ">
          <li className="py-5 bg-gray-200 dark:bg-gray-800 rounded px-1">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <div className="relative">
                  <span className="absolute left-9 bottom-0 right-0 text-green-500">
                    <svg width="12" height="12">
                      <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img className="w-12 h-12 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Neil image" />
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4 space-y-1">
                <p className="text-sm font-bold text-gray-800 truncate dark:text-gray-500">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 font-medium dark:text-gray-400 line-clamp-1 ">
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                </p>
              </div>
            </div>
          </li>

          <li className="py-5 bg-gray-200 dark:bg-gray-800 rounded px-1">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <div className="relative">
                  <span className="absolute left-9 bottom-0 right-0 text-green-500">
                    <svg width="12" height="12">
                      <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img className="w-12 h-12 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Neil image" />
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4 space-y-1">
                <p className="text-sm font-bold text-gray-800 truncate dark:text-gray-500">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 font-medium dark:text-gray-400 line-clamp-1 ">
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                </p>
              </div>
            </div>
          </li>

          <li className="py-5 bg-gray-200 dark:bg-gray-800 rounded px-1">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <div className="relative">
                  <span className="absolute left-9 bottom-0 right-0 text-green-500">
                    <svg width="12" height="12">
                      <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img className="w-12 h-12 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Neil image" />
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4 space-y-1">
                <p className="text-sm font-bold text-gray-800 truncate dark:text-gray-500">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 font-medium dark:text-gray-400 line-clamp-1 ">
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                </p>
              </div>
            </div>
          </li>

          <li className="py-5 bg-gray-200 dark:bg-gray-800 rounded px-1">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <div className="relative">
                  <span className="absolute left-9 bottom-0 right-0 text-green-500">
                    <svg width="12" height="12">
                      <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img className="w-12 h-12 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Neil image" />
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4 space-y-1">
                <p className="text-sm font-bold text-gray-800 truncate dark:text-gray-500">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 font-medium dark:text-gray-400 line-clamp-1 ">
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
                </p>
              </div>
            </div>
          </li>



        </ul>
      </div>

    </div >
  )
}
