import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TiltedCard from '@/components/ui/TiltedCard'



const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])





  return (
    <div className='min-h-screen mb-5'>
      <p className='text-gray-600 '>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row item-start gap-5 mt-5 '>
        <div className='flex flex-col gap-4 text-gray-600 text-sm '>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}]`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}]`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}]`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}]`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}]`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}]`}>Gastroenterologist</p>
        </div>
        <div onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className="w-full grid lg:grid-cols-auto md:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-4 ">
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border p-2' key={index}>
                <TiltedCard
                  imageSrc={item.image}
                  altText={item.name}
                  captionText={item.name}
                  containerHeight="300px"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  rotateAmplitude={14}
                  scaleOnHover={1.02}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="mx-2 p-1 rounded-lg" >
                      <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500' } `}>
                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500' }  rounded-full`}></p><p>{item.available ? 'Avilable': 'Not Available'}</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                      <p className='text-gray-800 text-sm'>{item.speciality}</p>
                    </div>
                  }
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors