import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { Outlet } from 'react-router-dom';
import Modal from "./components/Modal/Modal.jsx";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '' || searchTerm.length < 2) {
            setIsModalOpen(true);
            return;
        }
        navigate(`/search?search=${encodeURIComponent(searchTerm.trim())}`); // Кодируем строку поиска
    };

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.overlay}>
                    <h1 className={styles.headerText}>Anime Explorer</h1>
                    <form className={styles.form} onSubmit={handleSearch}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Search for anime..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className={styles.button}
                            type="submit"
                            disabled={searchTerm.trim() === ''}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            {/* Модальное окно */}
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <h3>Invalid Search</h3>
                    <p>Your search query must be at least 3 characters long.</p>
                </Modal>
            )}
        </div>
    );
};

export default Home;
