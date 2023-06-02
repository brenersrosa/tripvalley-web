import Slider from 'react-slick';
import '../styles/custom-slick.css';
import 'slick-carousel/slick/slick-theme.css';



export function Carousel() {
    
    const settings = {
        slidesToShow: 3,
        slidesToScroll: 2,
    };
    return (
            <Slider className="hidden md:block w-[1100px]" {...settings}>
                <div className='text-center'>
                    <img src="src/assets/carousel/image-2.png" alt="" />
                    <h3 className="text-gray-800 font-semibold text-lg mb-1 mt-3">Circuito religioso</h3>
                    <p className="text-gray-700 font-light text-base ">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className='text-center'>
                    <img src="src/assets/carousel/image-1.png" alt="" />
                    <h3 className="text-gray-800 font-semibold text-lg mb-1 mt-3">Vale histórico</h3>
                    <p className="text-gray-700 font-light text-base ">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className='text-center'>
                    <img src="src/assets/carousel/image-3.png" alt="" />
                    <h3 className="text-gray-800 font-semibold text-lg mb-1 mt-3">Litoral Norte</h3>
                    <p className="text-gray-700 font-light text-base ">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div>
                    <img src="src/assets/carousel/image-1.png" alt="" />
                </div>
            </Slider>
    );
}



// const images = [
//     { src: 'src/assets/carousel/image-1.png', alt: 'Image 1' },
//     { src: 'src/assets/carousel/image-1.png', alt: 'Image 2' },
//     { src: 'src/assets/carousel/image-1.png', alt: 'Image 3' },
//     { src: 'src/assets/carousel/image-1.png', alt: 'Image 4' },
//     // Adicione mais imagens conforme necessário
// ];