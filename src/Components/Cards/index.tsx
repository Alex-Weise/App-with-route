import React, { FC, forwardRef, useState } from "react";
import { MobileStepper, Button } from "@mui/material";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link } from "react-router-dom";
import style from "./styles.module.scss";
import { motion } from "framer-motion";

type TCards = {
  title: string,
  img: string[],
  discr: string,
  id:number,
}

const Cards:FC<TCards> = forwardRef<HTMLDivElement, TCards>(({title, img, discr, id}, ref) =>  {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = img.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

    return (
        <div className={style.card} ref={ref}>
          <div className={style.image}>
            <img src={img[activeStep]} alt={title} className={style.img}/>
            <MobileStepper
              className={style.stepper}
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" color="secondary" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  <KeyboardArrowRight />
                </Button>}
              backButton={
                <Button size="small" color="secondary" onClick={handleBack} disabled={activeStep === 0}>
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
})

export {Cards};
export const MCards = motion(Cards);