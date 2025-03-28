import { assets } from '@/assets/assets'
import AnimatedList from '@/components/AnimatedList/AnimatedList'
import { ShinyButton } from '@/components/ui/shiny-button'
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

const MyProfile = () => {


  const { userData, setUserData, token, backendurl, loadUserProfileData, getMedicalHistory } = useContext(AppContext)

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [itemss, setItemss] = useState([])


  const updateUserProfileData = async () => {

    try {

      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)
      const { data } = await axios.post(backendurl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  return userData && (
    <div className='mx-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit
          ? <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          :
          <img className='w-36 rounded-md' src={userData.image} alt="" />

      }
      {
        isEdit ?
          <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          :
          <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div className="">
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500 '>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit ?
              <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              :
              <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit ?
              <p>
                <input className='bg-gray-50 ' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />
                <br />
                <input className='bg-gray-50 ' value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
              </p>
              :
              <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div className="">
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className="grid grid-col-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className='font-medium'>Gender:</p>
          {
            isEdit ?
              <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium' >Birthday:</p>
          {
            isEdit ?
              <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              :
              <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <p className="text-neutral-500 underline mt-3">MEDICAL RECORD</p>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 md:min-w-96 md:w-fit">
        <div className="space-y-2 h-40 overflow-y-scroll  ">
          {
            userData.medicalHistory.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="font-medium text-gray-800">{item.condition}</span>
                <span className="text-sm text-gray-500">{new Date(item.diagnosisDate).toLocaleDateString()}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className='my-6 '>
        {
          isEdit ?
            <ShinyButton className='font-semibold px-5 py-2 bg-[#163d77] rounded-full ' onClick={updateUserProfileData}>Save</ShinyButton>
            :
            <ShinyButton className='font-semibold px-5 py-2 bg-[#163d77] rounded-full' onClick={() => setIsEdit(true)}>Edit</ShinyButton>
        }
      </div>
    </div>
  )
}

export default MyProfile