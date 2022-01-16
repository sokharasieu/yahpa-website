import { Box, Select, SelectFieldProps } from "@chakra-ui/react";
import useTranslation, { Resource } from "hooks/useTranslation";
import { IoLanguage } from "react-icons/io5";

export default function LanguagePicker(selectProps: SelectFieldProps) {
  const { languages, updateLocale, locale, locales } = useTranslation();

  const handleLocaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newLocale = e.currentTarget.value;
    updateLocale(newLocale);
  };

  return (
    <Select
      defaultValue={locale}
      onChange={handleLocaleChange}
      width="7rem"
      icon={<IoLanguage />}
      {...selectProps}
    >
      {locales?.map((language, index) => {
        return (
          <Box
            as="option"
            key={index}
            value={language}
            backgroundColor="white"
            color="black"
          >
            {languages[language as Resource]}
          </Box>
        );
      })}
    </Select>
  );
}
