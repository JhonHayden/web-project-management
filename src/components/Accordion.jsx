import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: "#01080B",
}));
const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: '#338DFF',
  color: 'white'
}));
const AccordionDetailsStyled = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: '#ccc',
}));
const AccordionStyledPadre = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: "#01080B",
}));
const AccordionSummaryStyledPadre = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: '#374B59 ',
  color: 'white',
  border: `1px solid`,
}));
const AccordionDetailsStyledPadre = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: '#C2EAFB',
}));

export {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
  AccordionStyledPadre,
  AccordionSummaryStyledPadre,
  AccordionDetailsStyledPadre,
};
