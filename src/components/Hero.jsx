import { Link } from 'react-router-dom'
import hero1 from '../assets/hero1.webp'
import hero2 from '../assets/hero2.webp'
import hero3 from '../assets/hero3.webp'
import hero4 from '../assets/hero4.webp'

const listImages = [hero1, hero2, hero3, hero4]

const Hero = () => {
  return (
    <div className="lg:grid grid-cols-2 gap-24">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="max-w-xl leading-8 mt-8 text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          repellat explicabo enim soluta temporibus asperiores aut obcaecati
          perferendis porro nobis.
        </p>
        <div className="mt-10">
          <Link to="/products" className=" btn btn-primary uppercase">
            our products
          </Link>
        </div>
      </div>
      <div className="hidden lg:carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box h-[28rem]">
        {listImages.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box object-cover w-80 h-full"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Hero
