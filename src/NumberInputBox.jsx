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
  const [initialMoney, setInitialMoney] = useState(0);
  const [inputError, setInputError] = useState('');
  const [formDataArray, setFormDataArray] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [formSubmissionStatus, setFormSubmissionStatus] = useState([]);
  const [total35Waiters, setTotal35Waiters] = useState(0);
  // const [totalBarBase, setTotalBarBase] = useState(0);
  // const [totalInchargeBase, setTotalInchargeBase] = useState(0);
  // const [totalWaiterTips, setTotalWaiterTips] = useState(0);
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [error, setError] = useState(null);
  const [barHours, setBarHours] = useState(0);
  const [inchargeHours, setInchargeHours] = useState(0);
  const [waitersHours, setWaitersHours] = useState(0);

  



  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value === '' || (parseInt(value, 10) >= 0 && !isNaN(value))) {
      setInputError('');
      setNumberOfForms(value);
      setFormSubmissionStatus(Array.from({ length: parseInt(value, 10) }).fill(false));
    } else {
      setInputError('מספר עובדים חייב להיות גדול מ-0');
    }
  };

  const handleInitialMoneyChange = (event) => {
    const value = event.target.value;
    setInitialMoney(value);
  };
  
  const handleFormSubmit = (formData, index) => {
    setSubmittedData((prevData) => [...prevData, { index, data: formData }]);

    setFormDataArray((prevData) => {
       // Filter out forms with category 'bar_35'
    const newData = prevData.filter((data) => data?.category !== 'bar_35');
    
    // Add the new form data if the category is not 'bar_35'
    if (formData.category === 'bar_35') {
      newData[index] = null;
      setInitialMoney((prevTotal) => prevTotal - formData.hours * 4.39);
    }
    else{
      if (formData.category === 'waiter_35'){
        setTotal35Waiters((prevTotal) => prevTotal + formData.hours * 35);
        setInitialMoney((prevTotal) => prevTotal - formData.hours * 35);
        console.log(initialMoney);
      }
      if (formData.category === 'waiter_tips'){
        setWaitersHours((prevTotal) => prevTotal + formData.hours);

      }
      if (formData.category === 'bar_tips'){
        setBarHours((prevTotal) => prevTotal + formData.hours)
      }
      if (formData.category === 'incharge'){
        setInchargeHours((prevTotal) => prevTotal + formData.hours)
      }
      newData[index] = formData;
    }
    setFormSubmissionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = true;
      return newStatus;
    });
    
    return newData;
    });
  };

  const handleSubmit = ()=>{
    console.log(initialMoney);
    const calculatedValue = initialMoney - (total35Waiters + waitersHours*36);
    console.log(barHours);
    console.log(waitersHours); 
    console.log(inchargeHours);
    if (calculatedValue < 0){
      setError('יש יותר הפרשה מכסף מזומן');
    }
    else{
      setError(null);
      setShowExtraContent(true);
    }
  };



  const formsArray = Array.from({ length: parseInt(numberOfForms, 10) >= 0 ? parseInt(numberOfForms, 10) : 0 });

  return (
    <ThemeProvider theme={theme}>
      <form style={{ width: '400px', margin: 'auto' }}>

      <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="initialMoney">הזן סה״כ כסף מזומן</InputLabel>
            <TextField type="number" id="initialMoney" name="initialMoney" fullWidth onChange={handleInitialMoneyChange}/>
          </FormControl>
        </div>

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
            <Form onSubmit={(data) => handleFormSubmit(data, index)}/>
          </div>
        ))}

        <div>
          {/* Display submitted data and results to the user */}
          {submittedData.map(({ index, data }) => {
            if (data.category === 'bar_35') {
              return (
                <div key={index}>
                  <Typography>{`שם: ${data.name}, שעות: ${data.hours}, סוג: ${data.category}`}</Typography>
                  <Typography>{`תוצאה: ${(data.hours * 4.39).toFixed(2)}`}</Typography>
                </div>
              );
            }
          return null; // Return null for other categories
          })}
          {/* Render the forms that are not yet submitted */}
         
        </div>

        <div>
          <Button 
            type="button" 
            variant="outlined"
            disabled={formSubmissionStatus.some((status) => !status)}
            onClick={handleSubmit}
            >
            שלח
          </Button>
        </div>

        {/* Display error if there is one */}
        {error && (
          <div>
            <Typography color="error">{error}</Typography>
          </div>
        )}

        {/* Display extra content when showExtraContent is true */}
        {showExtraContent && (
          <div>
            <Typography>{`הפרשה: ${(total35Waiters + waitersHours*36).toFixed(2)}`}</Typography>
            <Typography>{`כמה לשעה: ${((initialMoney + (barHours*30.61) + (inchargeHours*31))/ (barHours + inchargeHours + waitersHours)).toFixed(2)}`}</Typography>
          </div>
        )}
      </form>
    </ThemeProvider>
  );
};

export default NumberInputBox;
