import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { ppcApi } from '../features/userApis';
import BtnLoader from './loader/BtnLoader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PpcForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialState = {
    leadId: '',
    mod: '',
    source: '',
    teamleader: '',
    leadQuality: '',
  };

  const [ppc, setPpc] = useState(initialState);

  const handleChange = (field, value) => {
    setPpc((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidForm = () => {
    return Object.values(ppc).every((val) => val.trim() !== '');
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!isValidForm()) {
      toast.error('Please fill all fields!');
      setLoading(false);
      return;
    }

    try {
      const { data } = await ppcApi(ppc);
      if (data?.success) {
        toast.success('Successfully Created!');
        setPpc(initialState);
        navigate('/bi/profile');
        window.location.reload();
      }
    } catch (error) {
      toast.error('Submission failed!');
    } finally {
      setLoading(false);
    }
  };

  const radioGroups = {
    teamleader: ['Umer', 'khula'],
    mod: ['ERC Dubai', 'ERC Abu Dhabi', 'ERC Saudi', 'Dynamic', 'Dynamic Silicon Oasis', 'ERC Oman'],
    source: ['Meta Ads', 'ppc', 'Snapchat', 'Tik Tok', 'Youtube'],
    leadQuality: [
      'Interested',
      'Interested in Other Procedure',
      'Not Interested',
      "Can't Afford",
      'Spam',
      'Other Country',
    ],
  };

  const renderRadioGroup = (label, name, options) => (
    <div className="bg-card-color rounded p-4">
      <h3>{label}</h3>
      {options.map((option) => (
        <label key={option} className="d-flex align-items-center gap-2">
          <Input
            className="m-2"
            type="radio"
            name={name}
            value={option}
            checked={ppc[name] === option}
            onChange={(e) => handleChange(name, e.target.value)}
          />
          {option}
        </label>
      ))}
    </div>
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 d-flex flex-column gap-3">
        {/* Header */}
        <div className="rounded d-flex flex-column align-items-center bg-card-color py-3">
          <h1 className="fw-bolder">BI COMM</h1>
          <h3 className="text-success text-center">
            Quality Control - Form Lead enquiry reference to the sales agent
          </h3>
        </div>

        {/* Lead ID */}
        <div className="rounded bg-card-color p-4">
          <label>
            Enter Lead ID:
            <Input
              type="text"
              placeholder="Enter Lead Id"
              required
              value={ppc.leadId}
              onChange={(e) => handleChange('leadId', e.target.value)}
            />
          </label>
        </div>

        {/* Render all radio groups */}
        {renderRadioGroup('Team Leader', 'teamleader', radioGroups.teamleader)}
        {renderRadioGroup('Branch', 'mod', radioGroups.mod)}
        {renderRadioGroup('Source', 'source', radioGroups.source)}
        {renderRadioGroup('Lead Quality', 'leadQuality', radioGroups.leadQuality)}

        {/* Submit */}
        <div className="p-4 text-center">
          <button
            type="button"
            className="btn btn-lg d-flex gap-2 justify-content-center align-items-center"
            style={{ backgroundColor: '#39c449', color: '#fff' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit {loading && <BtnLoader />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PpcForm;
