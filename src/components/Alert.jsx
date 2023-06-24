const Alert = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-rose-500 to-rose-700' : 'from-emerald-500 to-emerald-700'} bg-gradient-to-br text-center p-3 rounded-md uppercase text-white font-bold text-sm my-3 `}>
        {alerta.message}
    </div>
  )
}

export default Alert