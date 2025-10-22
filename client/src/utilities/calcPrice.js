// Price configuration for all bag options
const PRICES = {
    bagType: {
      'Backpack': 30,
      'Tote': 25,
      'Crossbody': 35,
      'Duffel': 40,
      'Clutch': 20,
      'Messenger': 35,
      '': 0
    },
    material: {
      'Leather': 50,
      'Canvas': 20,
      'Nylon': 25,
      'Recycled': 30,
      '': 0
    },
    design: {
      'Plain': 0,
      'Printed': 15,
      'Embroidered': 25,
      '': 0,
      null: 0
    },
    accessories: {
      'None': 0,
      'Charms': 10,
      'Extra Pockets': 15,
      'Shoulder Strap': 20,
      'Buckles': 12,
      '': 0,
      null: 0
    }
  }
  
  /**
   * Calculate the total price of a bag based on selected options
   * @param {Object} bagData - Object containing bag configuration
   * @returns {number} - Total price
   */
  export function calculateTotalPrice(bagData) {
    let total = 0
  
    // Add base price for bag type
    total += PRICES.bagType[bagData.bag_type] || 0
  
    // Add material price
    total += PRICES.material[bagData.material] || 0
  
    // Add design price
    total += PRICES.design[bagData.design] || 0
  
    // Add accessories price
    total += PRICES.accessories[bagData.accessories] || 0
  
    return total
  }
  
  /**
   * Get price for a specific option
   * @param {string} category - Category of the option (bagType, material, etc.)
   * @param {string} option - The specific option
   * @returns {number} - Price for that option
   */
  export function getOptionPrice(category, option) {
    if (PRICES[category] && PRICES[category][option] !== undefined) {
      return PRICES[category][option]
    }
    return 0
  }
  
  /**
   * Format price for display
   * @param {number} price - Price to format
   * @returns {string} - Formatted price string
   */
  export function formatPrice(price) {
    return typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2)
  }
  
  /**
   * Get all prices for a category
   * @param {string} category - Category to get prices for
   * @returns {Object} - Object with all prices for that category
   */
  export function getCategoryPrices(category) {
    return PRICES[category] || {}
  }