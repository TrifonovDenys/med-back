export const emailRegex = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'

/**
  Has minimum 8 characters in length. Adjust it by modifying {8,}
  At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
  At least one lowercase English letter.  You can remove this condition by removing (?=.*?[a-z])
  At least one digit. You can remove this condition by removing (?=.*?[0-9])
  At least one special character,  You can remove this condition by removing (?=.*?[#?!@$%^&*-])
 */
export const passwordRegex = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/'
