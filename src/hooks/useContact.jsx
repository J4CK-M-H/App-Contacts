import { useContext } from "react"
import ContactContext from "../context/ContactsProvider";

const useContact = () => {
  return useContext(ContactContext)
}

export default useContact;