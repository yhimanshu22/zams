import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Announcement Banner */}
      <div className="mx-auto mt-10 max-w-6xl text-center sm:mt-32">
        {/* Highlighted Notification Bar */}
        <div className="mx-auto mb-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-6 py-2 shadow-lg backdrop-blur-md transition-all hover:border-gray-400 hover:bg-white/70">
          <p className="text-sm font-medium text-gray-700">
            🍔 Enjoy Fast & Fresh Food, Delivered to You!
          </p>
        </div>

        {/* Hero Section */}
        <h1 className="max-w-4xl mx-auto text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Get Your Favorite <span className="text-red-600">Food</span> <br /> Delivered in Minutes!
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
          Order from top-rated restaurants and enjoy fresh, delicious meals at your doorstep. Quick, easy, and hassle-free!
        </p>

        {/* Call to Action Button */}
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-6 inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition",
          })}
          href="/menu"
        >
          Order Now <ArrowRight className="h-5 w-5" />
        </Link>
      </div>


      {/* Feature Section */}
      <div className='mx-auto h-screen mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              How It Works
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Ordering food has never been easier. Follow these simple steps:
            </p>
          </div>
        </div>

        {/* Steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-red-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-red-600'>Step 1</span>
              <span className='text-xl font-semibold'>Browse Restaurants</span>
              <span className='mt-2 text-zinc-700'>
                Choose from a wide variety of restaurants and cuisines.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-red-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-red-600'>Step 2</span>
              <span className='text-xl font-semibold'>Select Your Meal</span>
              <span className='mt-2 text-zinc-700'>
                Pick your favorite dishes and customize your order.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-red-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-red-600'>Step 3</span>
              <span className='text-xl font-semibold'>Fast Delivery</span>
              <span className='mt-2 text-zinc-700'>
                Sit back and relax while we deliver your food hot & fresh!
              </span>
            </div>
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
}
