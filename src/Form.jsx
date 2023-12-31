import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box, Typography } from '@mui/material';

const Form = ({ onSubmit}) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      hours,
      category: type,
    };
    onSubmit(formData);
  };

  return (
    <Box style={{ display: 'grid', gap: '16px' }}>
      <div>
        <TextField
          style={{ width: '120px', marginBottom: '16px' }}
          label="שם עובד/ת"
          id="name"
          name="name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ width: '160px', marginBottom: '16px' }}
          label="מספר שעות עובד/ת"
          id="hours"
          name="hours"
          variant="outlined"
          fullWidth
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>
      <div>
        <FormControl fullWidth style={{ width: '120px', marginBottom: '16px' }}>
          <InputLabel id="type">סוג עובד/ת</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="סוג עובד/ת"
            onChange={handleChange}
          >
            <MenuItem value="bar_35">ברמנ/ית על 35</MenuItem>
            <MenuItem value="bar_tips">ברמנ/ית על טיפים</MenuItem>
            <MenuItem value="waiter_35">מלצר/ית על 35</MenuItem>
            <MenuItem value="waiter_tips">מלצר/ית על טיפים</MenuItem>
            <MenuItem value="incharge">אחמ״ש</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button variant="outlined" type="submit" onClick={handleSubmit}>
        שלח
      </Button>
    </Box>
  );
};

export default Form;
