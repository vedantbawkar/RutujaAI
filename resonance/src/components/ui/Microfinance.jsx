import React, { useState } from 'react'; 
import { Board, BoardContent, BoardHeader, BoardTitle } from './Board';
import { Input } from './Input';
import { Label } from './label';
import Button from './Button';
import { Select } from './select';
import { Clock } from 'lucide-react';

const Microfinance = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessStage: '',
    numEmployees: '',
    monthlyIncome: '',
    fundingPurpose: '',
    requiredAmount: '',
    fundingType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Application submitt ed successfully!');
        setFormData({
          businessName: '',
          businessType: '',
          businessStage: '',
          numEmployees: '',
          monthlyIncome: '',
          fundingPurpose: '',
          requiredAmount: '',
          fundingType: ''
        });
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error submitting application');
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-turquoise-500 to-cyan-600 flex items-center justify-center p-4">
      <Board className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <BoardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-6 h-6 text-teal-500" />
            <BoardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Business Funding Application
            </BoardTitle>
          </div>
          <p className="text-center text-gray-500">Apply for funding to support your business</p>
        </BoardHeader>
        <BoardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name (If Any)</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessType">Type of Business</Label>
              <Input
                id="businessType"
                name="businessType"
                placeholder="E.g., Dairy Farming, Handicrafts"
                value={formData.businessType}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessStage">Business Stage</Label>
              <Select id="businessStage" name="businessStage" value={formData.businessStage} onChange={handleChange} required>
                <option value="">Select stage</option>
                <option value="Idea Stage">Idea Stage</option>
                <option value="Startup">Startup</option>
                <option value="Established">Established</option>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numEmployees">Number of Employees (If Any)</Label>
              <Input
                id="numEmployees"
                name="numEmployees"
                type="number"
                placeholder="Enter number of employees"
                value={formData.numEmployees}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Current Monthly Income from Business</Label>
              <Input
                id="monthlyIncome"
                name="monthlyIncome"
                type="number"
                placeholder="Enter monthly income in INR"
                value={formData.monthlyIncome}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fundingPurpose">Purpose of Funding</Label>
              <Input
                id="fundingPurpose"
                name="fundingPurpose"
                placeholder="E.g., Buying Equipment, Expansion"
                value={formData.fundingPurpose}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requiredAmount">Required Amount (INR)</Label>
              <Input
                id="requiredAmount"
                name="requiredAmount"
                type="number"
                placeholder="Enter estimated amount in INR"
                value={formData.requiredAmount}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fundingType">Preferred Funding Type</Label>
              <Select id="fundingType" name="fundingType" value={formData.fundingType} onChange={handleChange} required>
                <option value="">Select funding type</option>
                <option value="Grant">Grant (Non-repayable)</option>
                <option value="Microfinance Loan">Microfinance Loan</option>
                <option value="Investor Support">Investor Support</option>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white transition-all duration-300"
            >
              Submit Application
            </Button>
          </form>
        </BoardContent>
      </Board>
    </div>
  );
};

export default Microfinance;
