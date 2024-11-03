import React, { useEffect, useState } from "react";
import { useConfigurator } from "../../contexts/ConfiguratorContext";
import {
  getManufacturers,
  getServices,
  validatePromoCode,
} from "../../utils/api";
import "./ServiceConfiguratorForm.scss";
import Button from "../../components/Button/Button";
import checkmarkIcon from "../../assets/icons/checkmark.svg";

const ServiceConfiguratorForm: React.FC = () => {
  const {
    setManufacturers,
    setServices,
    setManufacturer,
    manufacturers,
    services,
    promoCode,
    discount,
    setDiscount,
    setPromoCode,
    fullName,
    setFullName,
    email,
    setEmail,
    note,
    setNote,
    setScreen,
    setPhoneNumber,
    phoneNumber,
    manufacturer,
    selectedServices,
    setSelectedServices,
  } = useConfigurator();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCouponVisible, setIsCouponVisible] = useState<boolean>(false);

  // Error states for form validation
  const [errors, setErrors] = useState({
    manufacturer: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    selectedServices: "",
    promoCode: "",
  });

  // Reset user data inputs on initial render
  useEffect(() => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setNote("");
    setPromoCode("");
    setDiscount(0);
    setSelectedServices(() => []);
    setManufacturer("");
  }, [
    setFullName,
    setEmail,
    setPhoneNumber,
    setNote,
    setPromoCode,
    setDiscount,
    setSelectedServices,
    setManufacturer,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manufacturersList = await getManufacturers();
        setManufacturers(manufacturersList);
        const servicesList = await getServices();
        setServices(servicesList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setManufacturers, setServices]);

  const handleServiceChange = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some((s) => s.name === service.name);

      if (isSelected) {
        return prevSelected.filter((s) => s.name !== service.name);
      } else {
        return [
          ...prevSelected,
          { id: service.id, name: service.name, price: service.price },
        ];
      }
    });
  };

  useEffect(() => {
    const total = selectedServices.reduce((acc, selectedService) => {
      return acc + selectedService.price;
    }, 0);
    const discountedTotal = total - (total * discount) / 100;
    setTotalPrice(discountedTotal);
  }, [selectedServices, discount]);

  const handleCouponValidation = async () => {
    try {
      const response = await validatePromoCode(promoCode ?? "");
      if (response) {
        setDiscount(response.discountPercentage);
        setErrors((prevErrors) => ({ ...prevErrors, promoCode: "" }));
        alert(
          `Promo code applied! You get a ${response.discountPercentage}% discount.`
        );
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          promoCode: "Coupon not valid",
        }));
      }
    } catch {
      setErrors((prevErrors) => ({
        ...prevErrors,
        promoCode: "Coupon not valid",
      }));
    }
  };

  const handleSubmit = () => {
    setErrors({
      manufacturer: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      selectedServices: "",
      promoCode: "",
    });

    const newErrors = {
      manufacturer: manufacturer
        ? ""
        : "Please select at least one manufacturer",
      fullName: fullName ? "" : "Please enter your full name",
      email: email ? "" : "Please enter your email address",
      phoneNumber: phoneNumber ? "" : "Please enter your phone number",
      selectedServices:
        selectedServices.length > 0 ? "" : "Please select at least one service",
      promoCode: errors.promoCode,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    setScreen("Summary");
  };

  return (
    <div className='service-configurator-form-container'>
      <h2 className='service-configurator-form-title'>Service Configurator</h2>

      <h4 className='manufacturer-title'>Select your vehicle's manufacturer</h4>
      <div className='manufacturer-container'>
        {manufacturers.map((manufacturerItem) => (
          <div key={manufacturerItem.id} className='manufacturer-item'>
            <input
              type='radio'
              name='manufacturer'
              value={manufacturerItem.id}
              onChange={() => setManufacturer(manufacturerItem.name)}
              style={{ borderColor: errors.manufacturer ? "red" : "" }}
            />
            {manufacturerItem.name}
          </div>
        ))}
        {errors.manufacturer && (
          <p className='error-message'>{errors.manufacturer}</p>
        )}
      </div>

      <h4 className='services-title'>Select one or more services you need</h4>
      <div className='services-container'>
        {services.map((service) => (
          <div key={service.id} className='service-item'>
            <input
              type='checkbox'
              id={service.id}
              value={service.id}
              checked={selectedServices.some((s) => s.name === service.name)}
              onChange={() => handleServiceChange(service.id)}
              style={{ borderColor: errors.selectedServices ? "red" : "" }}
            />

            <label htmlFor={service.id}>
              {`${service.name} (${service.price} €)`}
            </label>
          </div>
        ))}
        {errors.selectedServices && (
          <p className='error-message'>{errors.selectedServices}</p>
        )}
      </div>

      <div className='total-price-container'>
        <h4 className='total-price'>Total: {totalPrice} €</h4>
        <div className='coupon-section'>
          {isCouponVisible ? (
            <>
              <input
                type='text'
                placeholder='Enter coupon code'
                value={promoCode || ""}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ borderColor: errors.promoCode ? "red" : "" }}
              />
              <Button
                type='primary'
                size='small'
                onClick={handleCouponValidation}
              >
                <img
                  src={checkmarkIcon}
                  alt='Checkmark'
                  className='checkmark-icon'
                />
              </Button>
              {errors.promoCode && (
                <p className='error-message'>{errors.promoCode}</p>
              )}
            </>
          ) : (
            <span onClick={() => setIsCouponVisible(!isCouponVisible)}>
              I have a coupon
            </span>
          )}
        </div>
      </div>

      <h4 className='user-data-title'>Your Information</h4>
      <div className='user-data-container'>
        <div className='input-row'>
          <label className='input-label'>
            Full Name
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Enter your full name'
              required
              style={{ border: errors.fullName ? "red solid 1px" : "" }}
            />
            {errors.fullName && (
              <p className='error-message'>{errors.fullName}</p>
            )}
          </label>
          <label className='input-label phone-label'>
            Phone Number
            <input
              type='tel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Enter your phone number'
              required
              style={{ border: errors.phoneNumber ? "red solid 1px" : "" }}
            />
            {errors.phoneNumber && (
              <p className='error-message'>{errors.phoneNumber}</p>
            )}
          </label>
        </div>
        <div className='input-row'>
          <label className='input-label'>
            Email Address
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email address'
              required
              style={{ border: errors.email ? "red solid 1px" : "" }}
            />
            {errors.email && <p className='error-message'>{errors.email}</p>}
          </label>
        </div>
        <div className='input-row'>
          <label className='input-label'>
            Note (optional)
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Enter a note'
            />
          </label>
        </div>
      </div>

      <Button
        type='primary'
        size='small'
        onClick={handleSubmit}
        className='full-width-button'
      >
        Next
      </Button>
    </div>
  );
};

export default ServiceConfiguratorForm;
