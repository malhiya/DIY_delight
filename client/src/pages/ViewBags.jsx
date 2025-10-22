import React, { useEffect, useState } from 'react'
import { getBags, deleteBag } from '../services/BagsAPI'
import { Link } from 'react-router-dom'
import '../App.css'
import '../css/ViewBags.css' 

const ViewBags = () => {
  const [bags, setBags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const data = await getBags()
        setBags(data)
      } catch (error) {
        console.error('Error fetching bags:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBags()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bag?')) {
      try {
        await deleteBag(id)
        setBags(bags.filter(bag => bag.id !== id))
      } catch (error) {
        console.error('Error deleting bag:', error)
        alert('Failed to delete bag. Please try again.')
      }
    }
  }

  if (loading) {
    return <div className="container">Loading bags...</div>
  }

  return (
    <div className="container">
      <h2>View All Bags</h2>
      
      {/* <div className="header-actions">
        <Link to="/create" className="create-btn">Create New Bag</Link>
      </div> */}

      {bags.length === 0 ? (
        <div className="empty-state">
          <p>No custom bags created yet.</p>
          <Link to="/create">Create your first bag!</Link>
        </div>
      ) : (
        <div className="bag-grid">
          {bags.map((bag) => (
            <div key={bag.id} className="bag-card">
              <div className="bag-header">
                <h3>{bag.user_name}'s {bag.bag_type}</h3>
              </div>
              
              <div className="bag-details">
                <p><strong>Material:</strong> {bag.material}</p>
                <p><strong>Color:</strong> {bag.color}</p>
                {bag.design && <p><strong>Design:</strong> {bag.design}</p>}
                {bag.accessories && <p><strong>Accessories:</strong> {bag.accessories}</p>}
                <p className="price"><strong>Price:</strong> ${bag.total_price}</p>
              </div>

              <div className="button-group">
                <Link to={`/bags/${bag.id}`} className="btn btn-details">
                  View Details
                </Link>
                <Link to={`/bags/${bag.id}/edit`} className="btn btn-edit">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(bag.id)} 
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewBags