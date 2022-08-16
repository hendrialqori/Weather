import './modal.css'

export const Modal = props => {
  const { open, setOpen, city } = props

  return (
    <section className={open ? 'active-modal modal-alert' : 'modal-alert'}>
        <div className='modal-container'>
            <h4>City "{city}" doesn't exist!</h4>
            <button onClick={() => setOpen(false)}>&#x2715;</button>
        </div>
    </section>
  )
} 