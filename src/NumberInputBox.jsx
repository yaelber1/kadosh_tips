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
  const [hoursValues, setHoursValues] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === '' || (parseInt(value, 10) >= 0 && !isNaN(value))) {
      setInputError('');
      setNumberOfForms(value);
    } else {
      setInputError('מספר עובדים חייב להיות גדול מ-0');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Collect "hours" and "type" values for each form
    const newHoursValues = formsArray.map((_, index) => {
      const formHours = parseFloat(event.target[`hours_${index}`]?.value || 0);
      const formType = event.target[`type_${index}`]?.value || '';
  
      if (formType === 'bar_35') {
        const result = calculateBar35Result(formHours);
        console.log(`Bar_35 Result for Form ${index + 1}:`, result);
        // You can display the name and result on the screen as needed
      }
  
      return { hours: formHours, type: formType };
    });
  
    setHoursValues(newHoursValues);
    console.log('Form Data:', newHoursValues);
  };
  

  const handleAppSubmit = () => {
    // Logic for the entire app submission
    console.log('All forms submitted with data:', hoursValues);

    // Optionally, you can perform additional calculations or actions with the collected data
  };

  const formsArray = Array.from({ length: parseInt(numberOfForms, 10) >= 0 ? parseInt(numberOfForms, 10) : 0 });

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit} style={{ width: '400px', margin: 'auto' }}>
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
            <Form onSubmit={(data) => console.log(`Form ${index + 1} submitted with data:`, data)} index={index} />
          </div>
        ))}

        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="money">הזן סה״כ כסף מזומן</InputLabel>
            <TextField type="number" id="money" name="money" fullWidth />
          </FormControl>
        </div>

        <div>
          <Button variant="outlined" onClick={handleAppSubmit}>
            שלח
          </Button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default NumberInputBox;
