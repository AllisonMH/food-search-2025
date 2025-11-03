import NovFoodDrivesImage from '../assets/images/NovFoodDrives.jpeg';
import '../styles/MonthlyDrive.scss';
import React from 'react';

function MonthlyDrive() {
  return (
    <div className="monthly-drive">
      <div className="monthly-drive__container">
        <div className="monthly-drive__content">
          <section className="monthly-drive__section">
            <h2>Ongoing Food Drives</h2>
            <p>View ongoing food drives below: (November 2025)</p>
            
            <div className="monthly-drive__drive-image-placeholder">
              <div className="monthly-drive__drive-image">
                <img 
                  src={NovFoodDrivesImage}
                  alt="Community Food Drive" 
                  className="monthly-drive__drive-image-file"
                />
              </div>
              
              <p>Join us in supporting our community by participating in these food drives!</p>
              <p>For more information, visit the website or contact them directly.</p>
              <p>Don't forget to check back for updates on upcoming drives!</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MonthlyDrive;

