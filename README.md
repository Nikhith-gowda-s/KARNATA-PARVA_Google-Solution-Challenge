# KARNATA-PARVA_Google-Solution-Challenge

# 🕵️ Fake News Detector  
**AI-Powered Misinformation Detection System**  
*GDG Solution Challenge 2025 Submission | Team KARNATA PARVA*  
  

## 🌟 Key Features  
- **Dual-Mode Analysis**  
  - 📝 Text verification using NLP  
  - 🖼️ Image/meme authenticity check  
- **Real-Time Results** with confidence percentages  
- **Educational Reports** explaining why content is flagged

## 🛠️ Technology Stack  
| Component       | Technology          |
|----------------|--------------------|
| **Frontend**   | HTML5, CSS3, JavaScript |
| **AI Engine**  | Google Gemini API *(Planned Integration)* |
| **Hosting**    | GitHub Pages       |

## 🔍 How It Works  
1. **Input**  
   - Paste suspicious text *or* upload image  
2. **Analysis**  
   - Text → Compares with known fake news markers  
   - Images → Detects AI-generation artifacts  
3. **Result**  
   - Returns visual badge:  
     - ✅ Authentic (80-100% confidence)  
     - ⚠️ Suspicious (50-79% confidence)  
     - ❌ Fake Detected (0-49% confidence)  

##For Gemini API integration**, add this section:
   ```markdown
   ## 🔑 API Setup
   1. Get Google API key from [AI Studio](https://aistudio.google.com/)
   2. Create `.env` file:
      ```env
      GEMINI_API_KEY=your_actual_key
      ```

## 🚀 Quick Start  
1. **Clone the repository**:  
   ```bash  
   git clone https://github.com/Nikhith-gowda-s/KARNATA-PARVA_Google-Solution-Challenge.git  
