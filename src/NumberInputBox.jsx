import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from './Form';

const theme = createTheme();

const NumberInputBox = () => {
  const [numberOfForms, setNumberOfForms] = useState('');
  const [inputError, setInputError] = useState('');
  const [formDataArray, setFormDataArray] = useState([]);


  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === '' || (parseInt(value, 10) >= 0 && !isNaN(value))) {
      setInputError('');
      setNumberOfForms(value);
    } else {
      setInputError('מספר עובדים חייב להיות גדול מ-0');
    }
  };

  
  const handleFormSubmit = (formData, index) => {
    setFormDataArray((prevData) => {
      const newData = [...prevData];
      newData[index] = formData;
      return newData;
    });
  };

  const calculateResults = () => {
    // Logic to calculate results for forms with category 'bar_35'
    formDataArray.forEach((formData, index) => {
      if (formData?.category === 'bar_35') {
        const result = 4.39 * parseFloat(formData.hours);
        console.log("כסף לקלמר של" , formData.name + " : " + result);
        // You can display the name and result on the screen as needed
      }
    });
  };

  const formsArray = Array.from({ length: parseInt(numberOfForms, 10) >= 0 ? parseInt(numberOfForms, 10) : 0 });

  return (
    <ThemeProvider theme={theme}>
      <form style={{ width: '400px', margin: 'auto' }}>
        <div>
          <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <TextField
              type="number"
              id="numberOfForms"
              label="הזן מספר עובדים במשמרת - כולל ברמנים ומלצרים על 35"
              value={numberOfForms}
              onChange={handleInputChange}
              error={!!inputError}
              helperText={inputError}
              fullWidth
            />
          </FormControl>
        </div>

        {formsArray.map((_, index) => (
          <div key={index} style={{ marginBottom: '10px', backgroundColor: index % 2 === 0 ? '#BFACCF' : '#f0f0f0' }}>
            <Typography variant="h" sx={{ color: 'black', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>
              עובד מספר {index + 1}
            </Typography>
            <Form onSubmit={(data) => handleFormSubmit(data, index)} />
          </div>
        ))}

        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="money">הזן סה״כ כסף מזומן</InputLabel>
            <TextField type="number" id="money" name="money" fullWidth />
          </FormControl>
        </div>

        <div>
          <Button type="button" variant="outlined" onClick={calculateResults}>
            שלח
          </Button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default NumberInputBox;
