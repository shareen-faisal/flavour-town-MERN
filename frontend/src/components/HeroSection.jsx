import styles from '../styles/Hero.module.css'
import heroImage from '../assets/heroImage.png'
export default function HeroSection() {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }} id='home' >
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <h1>
            Delicious <span>Food</span> Delivered Fast!
          </h1>
          <p>
            Fresh ingredients, juicy flavors, and quick service – everything you
            crave in one place.
          </p>
          <a href="#menu"><button className={styles.ctaBtn} >Order Now</button></a>
        </div>
      </div>
    </section>
  )
}
