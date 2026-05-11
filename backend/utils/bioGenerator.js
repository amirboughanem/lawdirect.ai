export default function generateBio(governorate, yearsOfExperience, specialties, jurisdictions, languages, gender) {
  return `Lawyer practicing in ${governorate}, Lebanon.
Specialties: ${specialties.join(', ')}
Jurisdictions: ${jurisdictions.join(', ')}
Languages: ${languages.join(', ')}
Gender: ${gender}
${yearsOfExperience} years of experience.`;
}
