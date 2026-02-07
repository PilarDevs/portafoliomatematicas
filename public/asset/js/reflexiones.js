import { reflexionesData as initialData } from './reflexiones_data.js';

class ReflexionesManager {
    constructor() {
        this.data = [];
        this.container = document.getElementById('reflexiones-container');
        this.template = document.getElementById('reflexion-template');
        this.form = document.getElementById('reflexion-form');
        this.adminPanel = document.getElementById('admin-panel');
        this.adminTrigger = document.getElementById('admin-trigger');
        this.closeAdminBtn = document.getElementById('close-admin');
        this.downloadBtn = document.getElementById('download-data');
        this.connectBtn = document.getElementById('connect-file-btn');
        
        // Auth elements
        this.loginModal = document.getElementById('login-modal');
        this.loginForm = document.getElementById('login-form');
        this.passwordInput = document.getElementById('password-input');
        this.loginError = document.getElementById('login-error');
        this.cancelLoginBtn = document.getElementById('cancel-login');
        
        // Toast
        this.toast = document.getElementById('toast-notification');
        this.toastTitle = document.getElementById('toast-title');
        this.toastMessage = document.getElementById('toast-message');
        this.toastIcon = document.getElementById('toast-icon');

        this.fileHandle = null;
        this.isAuthenticated = false;
        this.editingId = null; // Track which item is being edited

        this.init();
    }

    init() {
        this.loadData();
        this.render();
        this.setupEventListeners();
        
        // Auto-fill date input with today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('new-date').value = today;
    }

    loadData() {
        // We use the imported file data as the base source of truth.
        this.data = [...initialData];
    }

    render() {
        // Clear container but keep template and loader messages
        // Simpler: Just remove "rendered" cards
        const oldCards = this.container.querySelectorAll('.reflexion-card.rendered');
        oldCards.forEach(card => card.remove());

        // Hide empty state if we have data
        const emptyState = this.container.querySelector('.text-center.text-gray-500');
        if (this.data.length > 0) {
            if(emptyState) emptyState.classList.add('hidden');
        } else {
            if(emptyState) emptyState.classList.remove('hidden');
            return; 
        }

        // Sort by date desc
        const sortedData = [...this.data].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedData.forEach(item => {
            const clone = this.template.firstElementChild.cloneNode(true);
            clone.classList.remove('hidden');
            clone.classList.add('rendered'); // Marker class
            
            clone.querySelector('.reflexion-title').textContent = item.title;
            clone.querySelector('.reflexion-content').textContent = item.content;
            clone.querySelector('.reflexion-date').textContent = this.formatDate(item.date);
            
            // Handle Actions
            const actionsDiv = clone.querySelector('.admin-actions');
            if (this.isAuthenticated && actionsDiv) {
                actionsDiv.classList.remove('hidden');
                
                const editBtn = actionsDiv.querySelector('.edit-btn');
                if (editBtn) editBtn.addEventListener('click', () => this.startEdit(item));

                const deleteBtn = actionsDiv.querySelector('.delete-btn');
                if (deleteBtn) deleteBtn.addEventListener('click', () => this.deleteReflexion(item.id));
            }
            
            this.container.appendChild(clone);
        });
    }

    setupEventListeners() {
        // Admin Panel Toggle flow
        this.adminTrigger.addEventListener('click', () => {
             if (this.isAuthenticated) {
                this.adminPanel.classList.remove('translate-y-full');
            } else {
                this.showLogin();
            }
        });

        // Login Logic
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const code = this.passwordInput.value;
                if (code === 'admin123') {
                    this.isAuthenticated = true;
                    this.hideLogin();
                    this.render(); // Re-render to show admin buttons
                    this.adminPanel.classList.remove('translate-y-full');
                    this.passwordInput.value = ''; // clear
                    this.loginError.classList.add('hidden');
                    this.showToast('Bienvenido Admin', 'Modo edición activado', 'success');
                } else {
                    this.loginError.classList.remove('hidden');
                    this.passwordInput.classList.add('border-red-500');
                    setTimeout(() => {
                        this.passwordInput.classList.remove('border-red-500');
                    }, 1000);
                }
            });

            this.cancelLoginBtn.addEventListener('click', () => {
                this.hideLogin();
                this.passwordInput.value = '';
                this.loginError.classList.add('hidden');
            });
        }

        this.closeAdminBtn.addEventListener('click', () => {
            this.adminPanel.classList.add('translate-y-full');
        });

        // Form Submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addReflexion();
        });

        // Download
        this.downloadBtn.addEventListener('click', () => {
            this.downloadJSFile();
        });

        // Connect File System API
        if (this.connectBtn) {
            this.connectBtn.addEventListener('click', async () => {
                await this.connectFile();
            });
        }
    }

    showLogin() {
        this.loginModal.classList.remove('hidden');
        // Slight delay for animation
        setTimeout(() => {
            this.loginModal.classList.remove('opacity-0');
        }, 10);
        this.passwordInput.focus();
    }

    hideLogin() {
        this.loginModal.classList.add('opacity-0');
        setTimeout(() => {
            this.loginModal.classList.add('hidden');
        }, 300);
    }

    async connectFile() {
        try {
            // Options for the file picker
            const opts = {
                types: [{
                    description: 'JavaScript File',
                    accept: { 'text/javascript': ['.js'] },
                }],
                multiple: false,
                suggestedName: 'reflexiones_data'
            };
            
            // Open file picker
            [this.fileHandle] = await window.showOpenFilePicker(opts);
            
            // Visual update
            this.connectBtn.classList.add('hidden');
            document.getElementById('connection-status').classList.remove('hidden');
            document.getElementById('local-mode-warning')?.classList.add('hidden');

            this.showToast('Conexión Exitosa', 'Guardado automático habilitado', 'success');
            
        } catch (err) {
            console.error('Error connecting file:', err);
            // Don't alert if user just cancelled
            if (err.name !== 'AbortError') {
                this.showToast('Error de Conexión', 'No se pudo conectar el archivo', 'error');
            }
        }
    }

    async saveToConnectedFile() {
        if (!this.fileHandle) return false;

        try {
            const content = `export const reflexionesData = ${JSON.stringify(this.data, null, 4)};`;
            
            // Create a writable stream to the file
            const writable = await this.fileHandle.createWritable();
            
            // Write the contents
            await writable.write(content);
            
            // Close the file
            await writable.close();
            
            return true;
        } catch (err) {
            console.error('Error saving to file:', err);
            alert('Error al guardar automáticamente: ' + err.message);
            return false;
        }
    }

    showToast(title, message, type = 'info') {
        if (!this.toast) return;

        // Set content
        this.toastTitle.textContent = title;
        this.toastMessage.textContent = message;

        // Set style based on type
        const borderClass = type === 'success' ? 'border-green-500' : 
                           type === 'error' ? 'border-red-500' : 'border-cyan-500';
        
        const iconHtml = type === 'success' ? '<i class="fas fa-check-circle text-green-400 text-xl"></i>' :
                         type === 'error' ? '<i class="fas fa-exclamation-circle text-red-400 text-xl"></i>' :
                                            '<i class="fas fa-info-circle text-cyan-400 text-xl"></i>';

        this.toast.className = `fixed top-24 right-4 z-[70] transform transition-all duration-300 min-w-[300px]`;
        this.toast.innerHTML = `
            <div class="bg-gray-800 border-l-4 ${borderClass} text-white p-4 rounded shadow-2xl flex items-center gap-3">
                <div>${iconHtml}</div>
                <div>
                    <h4 class="font-bold text-sm">${title}</h4>
                    <p class="text-xs text-gray-400">${message}</p>
                </div>
            </div>
        `;

        // Show
        requestAnimationFrame(() => {
             this.toast.classList.remove('translate-x-full', 'opacity-0');
        });

        // Hide after 4s
        setTimeout(() => {
            this.toast.classList.add('translate-x-full', 'opacity-0');
        }, 4000);
    }

    async addReflexion() {
        const title = document.getElementById('new-title').value;
        const date = document.getElementById('new-date').value;
        const content = document.getElementById('new-content').value;

        if (this.editingId) {
            // Update existing
            const index = this.data.findIndex(item => item.id === this.editingId);
            if (index !== -1) {
                this.data[index] = { ...this.data[index], title, date, content };
            }
        } else {
            // Create New
            const newItem = {
                id: Date.now(), // simple unique id
                title,
                content,
                date
            };
            this.data.unshift(newItem); // Add to beginning
        }

        this.render();
        
        // Save Process
        let saveSuccess = false;
        if (this.fileHandle) {
            saveSuccess = await this.saveToConnectedFile();
        }

        // Visual feedback & Toast
        const btn = this.form.querySelector('button[type="submit"]');
        const originalText = this.editingId ? '<i class="fas fa-save mr-2"></i>Actualizar Reflexión' : '<i class="fas fa-plus mr-2"></i>Publicar Reflexión';
        
        if (saveSuccess) {
            btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Guardado';
            btn.classList.replace('bg-cyan-600', 'bg-green-600');
            this.showToast('¡Éxito!', this.editingId ? 'Reflexión actualizada' : 'Reflexión guardada', 'success');
        } else if (this.fileHandle) {
             btn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Error';
             this.showToast('Error', 'No se pudo guardar automáticamente', 'error');
        } else {
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>Hecho (Local)';
            btn.classList.replace('bg-cyan-600', 'bg-green-600');
            this.showToast('Actualizado (Local)', 'Descarga el JS para guardar permanentemente', 'info');
        }
        
        // Reset Logic
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-plus mr-2"></i>Publicar Reflexión'; // Default Text
            if (btn.classList.contains('bg-green-600')) btn.classList.replace('bg-green-600', 'bg-cyan-600');
            
            this.form.reset();
            document.getElementById('new-date').value = new Date().toISOString().split('T')[0];
            this.editingId = null; // Clear edit mode
            
            // If we were editing, maybe close the panel? User preference. Let's keep it open but reset.
        }, 1500);
    }

    startEdit(item) {
        this.editingId = item.id;
        
        document.getElementById('new-title').value = item.title;
        document.getElementById('new-date').value = item.date;
        document.getElementById('new-content').value = item.content;

        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Actualizar Reflexión';
        
        this.adminPanel.classList.remove('translate-y-full'); // Open panel
        // Highlight that we are editing?
    }

    async deleteReflexion(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar esta reflexión?')) return;

        this.data = this.data.filter(item => item.id !== id);
        this.render();

        if (this.fileHandle) {
             const saved = await this.saveToConnectedFile();
             if (saved) this.showToast('Eliminado', 'Cambios guardados en archivo', 'success');
             else this.showToast('Error', 'No se pudo guardar la eliminación', 'error');
        } else {
             this.showToast('Eliminado (Local)', 'Recuerda guardar o descargar', 'info');
        }
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    downloadJSFile() {
        const content = `export const reflexionesData = ${JSON.stringify(this.data, null, 4)};`;
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reflexiones_data.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Archivo descargado. Por favor reemplaza el archivo original en: public/asset/js/reflexiones_data.js');
    }
}

// Export class for manual initialization
export { ReflexionesManager };
