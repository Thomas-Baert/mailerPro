import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as univService from '../services/universities.service';
import { compressImage } from '../utils/imageCompressor';
import styles from './Auth.module.css';

export default function AdminUniversities() {
    const queryClient = useQueryClient();
    const [logoBase64, setLogoBase64] = useState<string | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);

    const { data: response, isLoading } = useQuery({
        queryKey: ['universities'],
        queryFn: () => univService.getUniversities(),
    });

    const mutation = useMutation({
        mutationFn: (data: { name: string, logo?: string }) => univService.createUniversity(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['universities'] });
            setLogoBase64(null);
            alert('University created successfully!');
        },
        onError: (err) => {
            console.error('Error creating university:', err);
            alert('Failed to create university.');
        }
    });

    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setIsCompressing(true);
                const compressed = await compressImage(file);
                setLogoBase64(compressed);
            } catch (err) {
                console.error('Compression error:', err);
                alert('Failed to process image.');
            } finally {
                setIsCompressing(false);
            }
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = data.get('name') as string;

        mutation.mutate({
            name,
            logo: logoBase64 || undefined
        });

        e.currentTarget.reset();
        setLogoBase64(null);
    }

    const universities = response?.data || [];

    return (
        <div className={styles.authContainer} style={{ maxWidth: '800px' }}>
            <h1 className={styles.authTitle}>Manage Universities</h1>
            <p className={styles.authSubtitle}>Onboard new establishments to the platform</p>

            <form className={styles.form} onSubmit={handleSubmit} style={{ marginBottom: '3rem' }}>
                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>University Name</label>
                        <input className={styles.input} type="text" name="name" placeholder="Ex: Université de Lyon" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Logo (Image)</label>
                        <input
                            className={styles.input}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {isCompressing && <p className={styles.loadingText}>Compressing...</p>}
                        {logoBase64 && (
                            <div style={{ marginTop: '0.5rem' }}>
                                <img src={logoBase64} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '4px' }} />
                                <button type="button" onClick={() => setLogoBase64(null)} style={{ marginLeft: '1rem', color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                            </div>
                        )}
                    </div>
                </div>
                <button type="submit" className={styles.submitBtn} disabled={mutation.isPending || isCompressing}>
                    {mutation.isPending ? 'Creating...' : 'Create University'}
                </button>
            </form>

            <div className={styles.inputGroup}>
                <h2 className={styles.label} style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Existing Universities</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {universities.map((uni: any) => (
                            <div key={uni.id} style={{
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                {uni.logo ? (
                                    <img src={uni.logo} alt={uni.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>No Logo</div>
                                )}
                                <span style={{ fontWeight: '500' }}>{uni.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
