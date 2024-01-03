import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box, Typography } from '@mui/material';

const Form = ({ onSubmit}) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [type, setType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHoursValid, setIsHoursValid] = useState('');
  const [formError, setFormError] = useState('');
  const [isButtonPushed, setButtonPushed] = useState('אל תשכח לשלוח את הטופס');

  const handleChangeSelect = (event) => {
    setType(event.target.value);
    setIsSubmitted(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
    setIsSubmitted(false);
  };

  const handleChangeHours = (event) => {
    const value = event.target.value;
    if (value === '' || (parseInt(value, 10) >= 0 && !isNaN(value))) {
      setIsHoursValid('');
      setHours(value);
      setIsSubmitted(false);
    } else {
      setIsHoursValid('מספר שעות חייב להיות גדול מ-0');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!name || !hours || !type) {
      setFormError('יש למלא את כל השדות');
      return;
    }

    const formData = {
      name,
      hours,
      category: type,
    };
    setButtonPushed('');
    setIsSubmitted(true);
    setFormError(''); // Clear any previous form error
    onSubmit(formData);
  };

  return (
    <Box style={{ display: 'grid', gap: '16px' }}>
      <div>
        <TextField
          style={{ width: '180px', marginBottom: '16px' }}
          label="שם עובד/ת"
          id="name"
          name="name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleChangeName}
        />
      </div>
      <div>
        <TextField
          style={{ width: '180px', marginBottom: '16px' }}
          label="מספר שעות עובד/ת"
          type="number"
          id="hours"
          name="hours"
          variant="outlined"
          fullWidth
          value={hours}
          onChange={handleChangeHours}
          error={!!isHoursValid}
          helperText={isHoursValid}
        />
      </div>
      <div>
        <FormControl fullWidth style={{ width: '180px', marginBottom: '16px' }}>
          <InputLabel id="type">סוג עובד/ת</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="סוג עובד/ת"
            onChange={handleChangeSelect}
          >
            <MenuItem value="bar_35">ברמנ/ית על 35</MenuItem>
            <MenuItem value="bar_tips">ברמנ/ית על טיפים</MenuItem>
            <MenuItem value="waiter_35">מלצר/ית על 35</MenuItem>
            <MenuItem value="waiter_tips">מלצר/ית על טיפים</MenuItem>
            <MenuItem value="incharge">אחמ״ש/ית</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button variant="outlined" type="submit" onClick={handleSubmit} disabled={isSubmitted}>
        שלח
      </Button>

      {isButtonPushed && (
        <Typography color="error" style={{ marginTop: '8px' }}>
          {isButtonPushed}
        </Typography>
      )}

      {/* Display form error message */}
      {formError && (
        <Typography color="error" style={{ marginTop: '8px' }}>
          {formError}
        </Typography>
      )}
    </Box>
  );
};

export default Form;
