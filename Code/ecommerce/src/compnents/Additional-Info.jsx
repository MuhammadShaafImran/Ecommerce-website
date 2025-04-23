import React from "react";
import SecureIcon from "./ui/SecureIcon";
import ShippingIcon from "./ui/ShippingIcon";
import SupportIcon from "./ui/SupportIcon";

export default function Addtional_Info () {
    
    return(
        <div className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <SecureIcon />
              <div>
                <p className="text-xs font-bold">100% SECURE</p>
                <p className="text-xs font-bold">CHECKOUT</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <ShippingIcon />
              <div>
                <p className="text-xs font-bold">SHIPPING TO OVER 70</p>
                <p className="text-xs font-bold">COUNTRIES</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <SupportIcon />
              <div>
                <p className="text-xs font-bold">OUTSTANDING</p>
                <p className="text-xs font-bold">SUPPORT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}