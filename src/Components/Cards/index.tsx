import React, { FC } from "react";
import { MobileStepper } from "@mui/material";
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link } from "react-router-dom";
import style from "./styles.module.scss"

type TCard = {
  title: string,
  img: string[],
  discr: string,
  id:number,
}

const Card:FC<TCard> = ({title, img, discr, id}) =>  {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = img.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

    return (
        <div className={style.card}>
          <div className={style.image}>
            <img src={img[activeStep]} alt={title} className={style.img}/>
            <MobileStepper
              className={style.stepper}
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  <KeyboardArrowRight />
                </Button>}
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                   <KeyboardArrowLeft />
                </Button>} 
              />
          </div>
          <span>
            <h3><Link to={`/products/${id}`} className={style.title}> {title} </Link></h3>
            <p className={style.text}>{discr}</p>
          </span>
        </div>
    );
}

export {Card};