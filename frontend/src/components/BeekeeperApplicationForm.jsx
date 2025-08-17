import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BeekeeperApplicationForm.css';

const BeekeeperApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // 1. Experience & Background
    yearsBeekeeping: '',
    numHives: '',
    beeTypes: '',
    journeyMotivation: '',
    
    // 2. Technical Skills & Knowledge
    hiveManagementMethods: '',
    hiveHealthMonitoring: '',
    queenRearingStrategies: '',
    swarmingHandling: '',
    pestDetectionTreatment: '',
    
    // 3. Sustainability & Ethics
    sustainablePractices: '',
    chemicalUseMinimization: '',
    pollinatorHealthSupport: '',
    organicCertification: '',
    
    // 4. Harvesting & Product Quality
    harvestFrequency: '',
    honeyQualityMethods: '',
    otherBeeProducts: '',
    packagingStandards: '',
    
    // 5. Business & Cooperative Fit
    cooperativeExperience: '',
    recordKeepingApproach: '',
    resourceSharing: '',
    longTermGoals: '',
    
    // 6. Problem-Solving & Innovation
    challengingSituation: '',
    modernTechnologies: '',
    stayingUpdated: '',
    
    // 7. Community & Education
    communityOutreach: '',
    mentoringWillingness: '',
    
    // 8. Risk Management & Hive Security
    hiveProtection: '',
    contingencyPlans: '',
    biosecurityMeasures: '',
    
    // 9. Research & Continuous Improvement
    newMethodsAdoption: '',
    performanceTracking: '',
    associationParticipation: '',
    
    // 10. Environmental & Agricultural Integration
    locationSelection: '',
    farmerCollaboration: '',
    urbanEnvironmentManagement: '',
    
    // 11. Record-Keeping & Traceability
    inspectionLogs: '',
    traceabilityMethods: '',
    foodSafetyStandards: '',
    
    // 12. Customer Focus & Marketing
    productDifferentiation: '',
    directConsumerExperience: '',
    customerEducation: '',
    
    // 13. Teamwork & Mentorship
    disagreementHandling: '',
    teachingExperience: '',
    groupDecisionParticipation: '',
    
    // 14. Innovation & Problem Solving
    processImprovements: '',
    adaptationPractices: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const emptyFields = Object.keys(formData).filter(key => !formData[key].trim());
    
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields before submitting.');
      return;
    }
    
    console.log('Beekeeper Application Submitted:', formData);
    alert('Application submitted successfully! We will review your application and get back to you soon.');
    navigate('/');
  };

  return (
    <div className="beekeeper-application-container">
      <h2>🐝 Become a Beekeeper Application</h2>
      <p className="form-description">
        Please fill out all fields below. All questions are mandatory to ensure we can properly evaluate your application.
      </p>
      
      <form onSubmit={handleSubmit} className="beekeeper-form">
        {/* Section 1: Experience & Background */}
        <div className="form-section">
          <h3>1. Experience & Background</h3>
          
          <div className="form-group">
            <label htmlFor="yearsBeekeeping">How many years have you been practicing beekeeping? *</label>
            <input
              type="number"
              id="yearsBeekeeping"
              name="yearsBeekeeping"
              value={formData.yearsBeekeeping}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="numHives">How many hives do you currently manage? *</label>
            <input
              type="number"
              id="numHives"
              name="numHives"
              value={formData.numHives}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="beeTypes">What types of bees do you work with (e.g., Apis mellifera, native species)? *</label>
            <input
              type="text"
              id="beeTypes"
              name="beeTypes"
              value={formData.beeTypes}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="journeyMotivation">Can you describe your journey into beekeeping and what motivates you? *</label>
            <textarea
              id="journeyMotivation"
              name="journeyMotivation"
              value={formData.journeyMotivation}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 2: Technical Skills & Knowledge */}
        <div className="form-section">
          <h3>2. Technical Skills & Knowledge</h3>
          
          <div className="form-group">
            <label htmlFor="hiveManagementMethods">What methods do you use for hive management (e.g., top-bar, Langstroth, Warre)? *</label>
            <textarea
              id="hiveManagementMethods"
              name="hiveManagementMethods"
              value={formData.hiveManagementMethods}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="hiveHealthMonitoring">How do you monitor and manage hive health and prevent diseases? *</label>
            <textarea
              id="hiveHealthMonitoring"
              name="hiveHealthMonitoring"
              value={formData.hiveHealthMonitoring}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="queenRearingStrategies">What strategies do you use for queen rearing or replacement? *</label>
            <textarea
              id="queenRearingStrategies"
              name="queenRearingStrategies"
              value={formData.queenRearingStrategies}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="swarmingHandling">How do you handle swarming, and what preventive measures do you employ? *</label>
            <textarea
              id="swarmingHandling"
              name="swarmingHandling"
              value={formData.swarmingHandling}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="pestDetectionTreatment">Can you explain how you detect and treat common pests like Varroa mites or small hive beetles? *</label>
            <textarea
              id="pestDetectionTreatment"
              name="pestDetectionTreatment"
              value={formData.pestDetectionTreatment}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 3: Sustainability & Ethics */}
        <div className="form-section">
          <h3>3. Sustainability & Ethics</h3>
          
          <div className="form-group">
            <label htmlFor="sustainablePractices">What practices do you follow to ensure sustainable beekeeping? *</label>
            <textarea
              id="sustainablePractices"
              name="sustainablePractices"
              value={formData.sustainablePractices}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="chemicalUseMinimization">How do you minimize chemical use while keeping hives healthy? *</label>
            <textarea
              id="chemicalUseMinimization"
              name="chemicalUseMinimization"
              value={formData.chemicalUseMinimization}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="pollinatorHealthSupport">How do you support pollinator health beyond your hives (e.g., planting forage, habitat preservation)? *</label>
            <textarea
              id="pollinatorHealthSupport"
              name="pollinatorHealthSupport"
              value={formData.pollinatorHealthSupport}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="organicCertification">Are you certified organic or pursuing any eco-friendly certification? *</label>
            <textarea
              id="organicCertification"
              name="organicCertification"
              value={formData.organicCertification}
              onChange={handleChange}
              rows="2"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 4: Harvesting & Product Quality */}
        <div className="form-section">
          <h3>4. Harvesting & Product Quality</h3>
          
          <div className="form-group">
            <label htmlFor="harvestFrequency">How often do you harvest honey, and what methods do you use? *</label>
            <textarea
              id="harvestFrequency"
              name="harvestFrequency"
              value={formData.harvestFrequency}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="honeyQualityMethods">How do you ensure the purity and quality of your honey and other hive products? *</label>
            <textarea
              id="honeyQualityMethods"
              name="honeyQualityMethods"
              value={formData.honeyQualityMethods}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="otherBeeProducts">Do you produce other bee products (e.g., beeswax, propolis, royal jelly)? *</label>
            <textarea
              id="otherBeeProducts"
              name="otherBeeProducts"
              value={formData.otherBeeProducts}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="packagingStandards">How do you package, label, and store your products to meet food safety standards? *</label>
            <textarea
              id="packagingStandards"
              name="packagingStandards"
              value={formData.packagingStandards}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 5: Business & Cooperative Fit */}
        <div className="form-section">
          <h3>5. Business & Cooperative Fit</h3>
          
          <div className="form-group">
            <label htmlFor="cooperativeExperience">Have you worked in a cooperative or collective before? If so, what was your experience? *</label>
            <textarea
              id="cooperativeExperience"
              name="cooperativeExperience"
              value={formData.cooperativeExperience}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="recordKeepingApproach">How do you approach record-keeping for production, sales, and hive management? *</label>
            <textarea
              id="recordKeepingApproach"
              name="recordKeepingApproach"
              value={formData.recordKeepingApproach}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="resourceSharing">Are you open to sharing resources, knowledge, and best practices with fellow coop members? *</label>
            <textarea
              id="resourceSharing"
              name="resourceSharing"
              value={formData.resourceSharing}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="longTermGoals">What are your long-term goals as a beekeeper, and how do they align with a cooperative model? *</label>
            <textarea
              id="longTermGoals"
              name="longTermGoals"
              value={formData.longTermGoals}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 6: Problem-Solving & Innovation */}
        <div className="form-section">
          <h3>6. Problem-Solving & Innovation</h3>
          
          <div className="form-group">
            <label htmlFor="challengingSituation">Can you describe a challenging beekeeping situation you've faced and how you resolved it? *</label>
            <textarea
              id="challengingSituation"
              name="challengingSituation"
              value={formData.challengingSituation}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="modernTechnologies">Are you familiar with modern beekeeping technologies (e.g., hive monitoring systems, swarm traps)? *</label>
            <textarea
              id="modernTechnologies"
              name="modernTechnologies"
              value={formData.modernTechnologies}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="stayingUpdated">How do you stay updated on new research or trends in apiculture? *</label>
            <textarea
              id="stayingUpdated"
              name="stayingUpdated"
              value={formData.stayingUpdated}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 7: Community & Education */}
        <div className="form-section">
          <h3>7. Community & Education</h3>
          
          <div className="form-group">
            <label htmlFor="communityOutreach">Do you engage in community outreach or education about bees and pollination? *</label>
            <textarea
              id="communityOutreach"
              name="communityOutreach"
              value={formData.communityOutreach}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="mentoringWillingness">Are you willing to mentor or assist less experienced coop members? *</label>
            <textarea
              id="mentoringWillingness"
              name="mentoringWillingness"
              value={formData.mentoringWillingness}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 8: Risk Management & Hive Security */}
        <div className="form-section">
          <h3>8. Risk Management & Hive Security</h3>
          
          <div className="form-group">
            <label htmlFor="hiveProtection">How do you protect your hives from theft, vandalism, or environmental threats? *</label>
            <textarea
              id="hiveProtection"
              name="hiveProtection"
              value={formData.hiveProtection}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="contingencyPlans">What contingency plans do you have for colony loss due to disease, weather, or pests? *</label>
            <textarea
              id="contingencyPlans"
              name="contingencyPlans"
              value={formData.contingencyPlans}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="biosecurityMeasures">How do you handle biosecurity to prevent spreading diseases between hives? *</label>
            <textarea
              id="biosecurityMeasures"
              name="biosecurityMeasures"
              value={formData.biosecurityMeasures}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 9: Research & Continuous Improvement */}
        <div className="form-section">
          <h3>9. Research & Continuous Improvement</h3>
          
          <div className="form-group">
            <label htmlFor="newMethodsAdoption">Have you experimented with or adopted new beekeeping methods or technologies? *</label>
            <textarea
              id="newMethodsAdoption"
              name="newMethodsAdoption"
              value={formData.newMethodsAdoption}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="performanceTracking">How do you track hive performance (e.g., honey yield, brood health)? *</label>
            <textarea
              id="performanceTracking"
              name="performanceTracking"
              value={formData.performanceTracking}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="associationParticipation">Do you participate in local or national beekeeping associations, workshops, or research projects? *</label>
            <textarea
              id="associationParticipation"
              name="associationParticipation"
              value={formData.associationParticipation}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 10: Environmental & Agricultural Integration */}
        <div className="form-section">
          <h3>10. Environmental & Agricultural Integration</h3>
          
          <div className="form-group">
            <label htmlFor="locationSelection">How do you select locations for your hives to maximize bee health and pollination impact? *</label>
            <textarea
              id="locationSelection"
              name="locationSelection"
              value={formData.locationSelection}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="farmerCollaboration">Do you collaborate with local farmers or gardeners to support pollination? *</label>
            <textarea
              id="farmerCollaboration"
              name="farmerCollaboration"
              value={formData.farmerCollaboration}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="urbanEnvironmentManagement">How do you manage hives near urban environments, pesticides, or monoculture crops? *</label>
            <textarea
              id="urbanEnvironmentManagement"
              name="urbanEnvironmentManagement"
              value={formData.urbanEnvironmentManagement}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 11: Record-Keeping & Traceability */}
        <div className="form-section">
          <h3>11. Record-Keeping & Traceability</h3>
          
          <div className="form-group">
            <label htmlFor="inspectionLogs">Do you maintain logs for hive inspections, treatments, and honey harvests? *</label>
            <textarea
              id="inspectionLogs"
              name="inspectionLogs"
              value={formData.inspectionLogs}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="traceabilityMethods">How do you ensure traceability from hive to final product? *</label>
            <textarea
              id="traceabilityMethods"
              name="traceabilityMethods"
              value={formData.traceabilityMethods}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="foodSafetyStandards">Are you familiar with food safety standards or certifications for honey production? *</label>
            <textarea
              id="foodSafetyStandards"
              name="foodSafetyStandards"
              value={formData.foodSafetyStandards}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 12: Customer Focus & Marketing */}
        <div className="form-section">
          <h3>12. Customer Focus & Marketing</h3>
          
          <div className="form-group">
            <label htmlFor="productDifferentiation">How do you differentiate your honey or bee products in the marketplace? *</label>
            <textarea
              id="productDifferentiation"
              name="productDifferentiation"
              value={formData.productDifferentiation}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="directConsumerExperience">Do you have direct-to-consumer experience (farmers markets, online sales, etc.)? *</label>
            <textarea
              id="directConsumerExperience"
              name="directConsumerExperience"
              value={formData.directConsumerExperience}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="customerEducation">How do you handle customer education about raw honey, allergies, and storage? *</label>
            <textarea
              id="customerEducation"
              name="customerEducation"
              value={formData.customerEducation}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 13: Teamwork & Mentorship */}
        <div className="form-section">
          <h3>13. Teamwork & Mentorship</h3>
          
          <div className="form-group">
            <label htmlFor="disagreementHandling">How do you handle disagreements or differing opinions within a cooperative setting? *</label>
            <textarea
              id="disagreementHandling"
              name="disagreementHandling"
              value={formData.disagreementHandling}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="teachingExperience">Can you describe a time when you taught someone else a beekeeping skill successfully? *</label>
            <textarea
              id="teachingExperience"
              name="teachingExperience"
              value={formData.teachingExperience}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="groupDecisionParticipation">Are you willing to participate in group decision-making about hive management, harvest schedules, or sales? *</label>
            <textarea
              id="groupDecisionParticipation"
              name="groupDecisionParticipation"
              value={formData.groupDecisionParticipation}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Section 14: Innovation & Problem Solving */}
        <div className="form-section">
          <h3>14. Innovation & Problem Solving</h3>
          
          <div className="form-group">
            <label htmlFor="processImprovements">Have you ever improved a hive design, tool, or process? *</label>
            <textarea
              id="processImprovements"
              name="processImprovements"
              value={formData.processImprovements}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="adaptationPractices">How do you adapt your practices to new climates, bee behavior changes, or local environmental challenges? *</label>
            <textarea
              id="adaptationPractices"
              name="adaptationPractices"
              value={formData.adaptationPractices}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Application
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeekeeperApplicationForm;
