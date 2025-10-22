import React, { useState } from 'react'
import { createBag } from '../services/BagsAPI'
import { useNavigate } from 'react-router-dom'
import '../css/CreateBag.css'
import '../App.css'

import toteImg from '../assets/tote.png'
import backpackImg from '../assets/backpack.png'
import crossbodyImg from '../assets/crossbody.png'
import canvasImg from '../assets/canvas.png'
import leatherImg from '../assets/leather.png'
import recycledImg from '../assets/recycled_fabric.png'
import patternImg from '../assets/pattern.png'
import embroideryImg from '../assets/embroidery.png'
import charmsImg from '../assets/charms.png'
import pocketsImg from '../assets/pockets.png'

const CreateBag = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    user_name: '',
    bag_type: '',
    color: '',
    material: '',
    design: '',
    accessories: '',
    total_price: 0,
  })

  const [error, setError] = useState('')


  const bagTypes = [
    { value: 'Tote', label: 'Tote Bag', image: toteImg, price: 15 },      
    { value: 'Backpack', label: 'Backpack', image: backpackImg, price: 20 },  
    { value: 'Crossbody', label: 'Crossbody', image: crossbodyImg, price: 10 } 
  ]

  const materials = [
    { value: 'Canvas', label: 'Canvas', image: canvasImg, price: 15 },    
    { value: 'Leather', label: 'Leather', image: leatherImg, price: 30 }, 
    { value: 'Recycled', label: 'Recycled Fabric', image: recycledImg, price: 20 } 
  ]

  const colors = [
    { value: 'Black', label: 'Black', color: '#000000' },
    { value: 'Navy', label: 'Navy', color: '#132440' },
    { value: 'Tan', label: 'Tan', color: '#D2B48C' },
    { value: 'Red', label: 'Red', color: '#DC2626' },
    { value: 'Brown', label: 'Brown', color: '#CA7842' },
    { value: 'Olive', label: 'Olive', color: '#4C763B' },
  ]

  const designs = [
    { value: 'Plain', label: 'Plain', price: 0 },
    { value: 'Printed', label: 'Printed Pattern', image: patternImg, price: 10 },    
    { value: 'Embroidered', label: 'Embroidered', image: embroideryImg, price: 15 } 
  ]

  const accessories = [
    { value: '', label: 'None', image: '/images/no-accessories.jpg', price: 0 },
    { value: 'Charm', label: 'Charm', image: charmsImg, price: 5 },    
    { value: 'Extra Pockets', label: 'Extra Pockets', image: pocketsImg, price: 10 } 
  ]

// Impossible Combinations
  const validateCombination = () => {
    if (formData.material === 'Leather' && formData.design === 'Printed') {
      return 'Leather cannot come in a printed design'
    }
    return null
  }

  const handleSelection = (category, value) => {
    const updatedFormData = {
      ...formData,
      [category]: value,
    }

  
    const bagTypePrice = bagTypes.find(b => b.value === updatedFormData.bag_type)?.price || 0
    const materialPrice = materials.find(m => m.value === updatedFormData.material)?.price || 0
    const designPrice = designs.find(d => d.value === updatedFormData.design)?.price || 0
    const accessoriesPrice = accessories.find(a => a.value === updatedFormData.accessories)?.price || 0

    const total = bagTypePrice + materialPrice + designPrice + accessoriesPrice

    setFormData({
      ...updatedFormData,
      total_price: total,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate all required fields
    if (!formData.user_name || !formData.bag_type || !formData.material || !formData.color) {
      setError('Please complete all required selections')
      return
    }

    // Check for impossible combinations
    const validationError = validateCombination()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      const submitData = {
        ...formData,
        design: formData.design || null,
        accessories: formData.accessories || null
      }
      
      await createBag(submitData)
      navigate('/bags')
    } catch (err) {
      setError('Failed to create bag. Please check your input.')
    }
  }

  return (
    <div className="visual-container">
      <h2>Design Your Custom Bag</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="visual-form">
        
  
        <div className="form-section">
          <label>Your Name:*</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={(e) => setFormData({...formData, user_name: e.target.value})}
            placeholder="Enter your name"
            required
          />
        </div>

     
        <div className="form-section">
          <label>Choose Bag Type:*</label>
          <div className="image-options">
            {bagTypes.map((type) => (
              <div
                key={type.value}
                className={`image-option ${formData.bag_type === type.value ? 'selected' : ''}`}
                onClick={() => handleSelection('bag_type', type.value)}
              >
                <div className="image-wrapper">
                  <img src={type.image} alt={type.label} />
                  <div className="hover-label">{type.label}</div>
                </div>
                <span className="price-tag">+${type.price}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="form-section">
          <label>Choose Material:*</label>
          <div className="image-options">
            {materials.map((material) => (
              <div
                key={material.value}
                className={`image-option ${formData.material === material.value ? 'selected' : ''}`}
                onClick={() => handleSelection('material', material.value)}
              >
                <div className="image-wrapper">
                  <img src={material.image} alt={material.label} />
                  <div className="hover-label">{material.label}</div>
                </div>
                <span className="price-tag">+${material.price}</span>
              </div>
            ))}
          </div>
        </div>

  
        <div className="form-section">
          <label>Choose Color:*</label>
          <div className="color-options">
            {colors.map((color) => (
              <div
                key={color.value}
                className={`color-option ${formData.color === color.value ? 'selected' : ''}`}
                onClick={() => handleSelection('color', color.value)}
              >
                <div 
                  className="color-swatch" 
                  style={{ backgroundColor: color.color }}
                >
                  <div className="hover-label">{color.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>Choose Design (Optional):</label>
          <div className="image-options">
            {designs.map((design) => (
              <div
                key={design.value}
                className={`image-option ${formData.design === design.value ? 'selected' : ''}`}
                onClick={() => handleSelection('design', design.value)}
              >
                <div className="image-wrapper">
                  <img src={design.image} alt={design.label} />
                  <div className="hover-label">{design.label}</div>
                </div>
                <span className="price-tag">+${design.price}</span>
              </div>
            ))}
          </div>
        </div>

   
        <div className="form-section">
          <label>Choose Accessories (Optional):</label>
          <div className="image-options">
            {accessories.map((accessory) => (
              <div
                key={accessory.value}
                className={`image-option ${formData.accessories === accessory.value ? 'selected' : ''}`}
                onClick={() => handleSelection('accessories', accessory.value)}
              >
                <div className="image-wrapper">
                  <img src={accessory.image} alt={accessory.label} />
                  <div className="hover-label">{accessory.label}</div>
                </div>
                <span className="price-tag">+${accessory.price}</span>
              </div>
            ))}
          </div>
        </div>

        
      
        <div className="price-display">
          <h3>Total Price: <span>${formData.total_price}</span></h3>
        </div>

        <button type="submit" className="submit-btn">Create My Bag</button>
      </form>
    </div>
  )
}

export default CreateBag