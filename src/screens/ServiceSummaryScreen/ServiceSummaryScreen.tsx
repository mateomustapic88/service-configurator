import React from "react";
import { useConfigurator } from "../../contexts/ConfiguratorContext";
import { requestFinalQuote } from "../../utils/api";
import "./ServiceSummaryScreen.scss";
import Button from "../../components/Button/Button";

const ServiceSummaryScreen: React.FC = () => {
  const {
    manufacturer,
    selectedServices,
    promoCode,
    fullName,
    email,
    note,
    phoneNumber,
    discount,
    setScreen,
  } = useConfigurator();

  // Calculate the discount multiplier (as a decimal)
  const discountMultiplier = 1 - discount / 100;

  // Calculate total cost with discount if promo code is applied
  const totalCost = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const discountedTotal = promoCode
    ? totalCost * discountMultiplier
    : totalCost;
  const discountAmount = promoCode ? totalCost - discountedTotal : 0;
  const discountPercentage = promoCode ? `${discount}%` : "0%";

  const handleSubmit = async () => {
    if (!manufacturer) {
      alert("Please select a manufacturer.");
      return;
    }

    const serviceIds = selectedServices.map((service) => service.id);

    const requestData = {
      manufacturerId: manufacturer,
      serviceIds,
      fullName,
      email,
      note,
      phoneNumber,
      ...(promoCode && { promoCode }),
    };

    try {
      await requestFinalQuote(requestData);
      setScreen("Success");
    } catch (error) {
      console.error("Failed to submit quote request", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='service-summary-screen'>
      <h2 className='title'>Konfigurator Servisa</h2>
      <h4 className='subtitle'>Pregled i potvrda vašeg odabira</h4>
      <p>
        Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite
        promijeniti neki od podataka, vratite se na prethodni korak. Kada ste
        provjerili ispravnost svojih podataka, za slanje upita na servis
        pritisnite gumb “Pošalji”.
      </p>

      <div className='summary-section'>
        <h4>Model vozila</h4>
        <p>{manufacturer}</p>
      </div>

      <div className='summary-section'>
        <h4>Odabrane usluge</h4>
        <ul>
          {selectedServices.map((service, index) => (
            <React.Fragment key={index}>
              <li>
                <span>{service.name}</span>
                <span>{service.price} €</span>
              </li>
              <hr />
            </React.Fragment>
          ))}
        </ul>
        <div className='discount-total'>
          {promoCode && (
            <p className='discount'>
              Popust: {discountPercentage} - {discountAmount.toFixed(2)} €
            </p>
          )}
          <p className='total'>
            <span>Ukupno:</span>
            <span>{discountedTotal.toFixed(2)} €</span>
          </p>
        </div>
      </div>

      <div className='summary-section'>
        <h4>Kontakt podaci</h4>
        <p>Ime i prezime: {fullName}</p>
        <p>Email adresa: {email}</p>
        <p>Broj telefona: {phoneNumber}</p>
        {note && <p>Napomena: {note}</p>}
      </div>

      <div className='actions'>
        <Button type='secondary' size='small' onClick={() => setScreen("Form")}>
          Nazad
        </Button>
        <Button
          className='submit-button'
          type='primary'
          size='small'
          onClick={handleSubmit}
        >
          Pošalji
        </Button>
      </div>
    </div>
  );
};

export default ServiceSummaryScreen;
