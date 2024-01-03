import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from './Form';

const theme = createTheme();

const containerStyle = {
  width: '300px', 
  height: '50px', 
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Rubik, sans-serif',
  fontSize: '16px', 
  fontWeight: 'bold',
};

const NumberInputBox = () => {
  const [numberOfForms, setNumberOfForms] = useState('');
  const [initialMoney, setInitialMoney] = useState(0);
  const [inputError, setInputError] = useState('');
  const [formDataArray, setFormDataArray] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [formSubmissionStatus, setFormSubmissionStatus] = useState([]);
  const [total35Waiters, setTotal35Waiters] = useState(0);
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [error, setError] = useState(null);
  const [barHours, setBarHours] = useState(0);
  const [inchargeHours, setInchargeHours] = useState(0);
  const [waitersHours, setWaitersHours] = useState(0);
  const [results, setResults] = useState([]);


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
    const newData = [...prevData];
    newData[index] = formData;
    
    // Add the new form data if the category is not 'bar_35'
    const hours = parseFloat(formData.hours);
    if (formData.category === 'bar_35') {
      setInitialMoney((prevTotal) => prevTotal - (hours * 4.39));
    }
    if (formData.category === 'waiter_35'){
      setTotal35Waiters((prevTotal) => prevTotal + (hours * 35));
      setInitialMoney((prevTotal) => prevTotal - (hours * 35));
    }
    if (formData.category === 'waiter_tips'){
      setWaitersHours((prevTotal) => prevTotal + hours);

    }
    if (formData.category === 'bar_tips'){
      setBarHours((prevTotal) => prevTotal + hours)
    }
    if (formData.category === 'incharge'){
      setInchargeHours((prevTotal) => prevTotal + hours)
    }
    newData[index] = formData;
    
    setFormSubmissionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = true;
      return newStatus;
    });
    
    return newData;
    });
  };

  const calculateResult = ()=>{
    const calculatedValue = initialMoney - (total35Waiters + waitersHours*36);
    const money = parseFloat(initialMoney);
    const numerator = parseFloat(money + (barHours*30.61) + (inchargeHours*31));
    const denominator = +barHours + +inchargeHours + +waitersHours;
    const moneyForHour = (numerator / denominator).toFixed(2);
    if (calculatedValue < 0){
      setError('יש יותר הפרשה מכסף מזומן');
    }
    else{
      setError(null);
      setShowExtraContent(true);
    }

    const resultsArray = [];
  
    formDataArray.forEach((formData, index) => {
      const hours = parseFloat(formData.hours);
      if (formData?.category === 'bar_tips') {
        // Calculate result for 'bar_tips'
        const result = (moneyForHour - 30.61) * hours;
        resultsArray.push({ index, category: 'bar_tips', result });
      
      } else if (formData?.category === 'waiter_tips') {
        // Calculate result for 'waiter_tips'
        const result = (moneyForHour - 36) * hours;
        resultsArray.push({ index, category: 'waiter_tips', result });
      
      } else if (formData?.category === 'incharge') {
        // Calculate result for 'incharge'
        const result = (moneyForHour - 31) * hours;
        resultsArray.push({ index, category: 'incharge', result });
      }
    });
    setResults(resultsArray);
    
  };



  const formsArray = Array.from({ length: parseInt(numberOfForms, 10) >= 0 ? parseInt(numberOfForms, 10) : 0 });

  return (
    <ThemeProvider theme={theme}>
      <form >

      <div style={{ marginBottom: '16px'}}>
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
          <div key={index} style={{backgroundColor: index % 2 === 0 ? '#F5EDD9' : '#f0f0f0', marginBottom: '16px' }}>
            <Typography variant="h" sx={{ color: 'black', fontFamily: 'Rubik, sans-serif', fontSize: '20px', fontWeight: 'bold'}}>
              עובד מספר {index + 1}
            </Typography>
            <div>
            <Form onSubmit={(data) => handleFormSubmit(data, index)}/>
            </div>
          </div>
        ))}

        <div style={{alignSelf: 'flex-start'}}>
          <Button 
            style={{alignSelf: 'flex-start', marginBottom: '16px'}}
            type="button" 
            variant="outlined"
            disabled={formSubmissionStatus.some((status) => !status)}
            onClick={calculateResult}
            >
            חשבו
          </Button>
        </div>

        <div>
          {/* Display submitted data and results to the user */}
          {submittedData.map(({ index, data }) => {
            if (data.category === 'bar_35') {
              return (
                <div key={index}>
                  <Typography sx={containerStyle}>{`שם: ${data.name}, שעות: ${data.hours}, כסף לקלמר: ${(data.hours * 4.39).toFixed(2)}`}</Typography>
                </div>
              );
            }
          return null; // Return null for other categories
          })}
          {/* Render the forms that are not yet submitted */}
        </div>

        {formSubmissionStatus.some((status) => !status) && (
          <div>
            <Typography color="error">עליך למלא את כל פרטי העובדים לפני ההגשה של הטופס</Typography>
          </div>
        )}

        {/* Display error if there is one */}
        {error && (
          <div>
            <Typography color="error">{error}</Typography>
          </div>
        )}

        {/* Display extra content when showExtraContent is true */}
        {showExtraContent && (
          <div>
            <Box style={{ display: 'grid', gap: '16px' }}>
              <Typography sx={containerStyle}>{`הפרשה: ${(total35Waiters + waitersHours*36).toFixed(2)}`}</Typography>
              <Typography sx={containerStyle}>{`כמה לשעה: ${parseFloat((parseFloat(initialMoney) + (barHours*30.61) + (inchargeHours*31))/ (+barHours + +inchargeHours + +waitersHours)).toFixed(2)}`}</Typography>
            </Box>
          </div>
        )}


        {/* Display results */}
        <div>
          <Container  maxWidth="sm">
          {results.map(({ index, result }) => (
            <Typography sx={containerStyle} key={index}>
              {`כסף לקלמר של ${submittedData[index].data.name}: ${result.toFixed(2)}`}
            </Typography>
          ))}
          </Container>
        </div>

      </form>
    </ThemeProvider>
  );
};

export default NumberInputBox;
