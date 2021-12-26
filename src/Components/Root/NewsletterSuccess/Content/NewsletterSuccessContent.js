import s from './NewsletterSuccessContent.module.css';

const NewsletterSuccessContent = () => {
  return (
    <div className={s.outer}>
      <div className={s.inner}>
        <div className={s.text}>
          {"Thank you for signing up for the Mivie Newsletter."}
        </div>
        <div className={s.text2}>
          {"You may now close this window."}
        </div>
        <div className={s.button} onClick={() => window.close()}>
          {"Close"}
        </div>
      </div>
    </div>
  );
}

export default NewsletterSuccessContent;
