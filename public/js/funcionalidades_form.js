document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const passwordField = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const submitButton = document.querySelector('button[type="submit"]');

    // Función para validar el formato del correo electrónico
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    // Función para validar la contraseña
    function validatePassword(password) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const isLongEnough = password.length >= 8;
      return hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
    }

    // Función para actualizar el estado del botón de envío
    function updateSubmitButtonState() {
      const errors = document.querySelectorAll('.error-message');
      const hasErrors = Array.from(errors).some(error => error.textContent !== '');
      submitButton.disabled = hasErrors; // Deshabilitar el botón si hay errores
    }

    // Toggle password visibility
    togglePasswordButton.addEventListener('click', function() {
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      
      // Cambiar el icono del ojo
      if (type === 'password') {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        `;
      } else {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
        `;
      }
    });

    // Validación del formulario
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Evitar el envío del formulario

      // Resetear mensajes de error
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(element => {
        element.textContent = '';
      });

      let isValid = true;

      // Obtener valores del formulario
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const termsAccepted = document.getElementById('termsAccepted').checked;

      // Validaciones
      if (!fullName) {
        document.getElementById('fullName-error').textContent = 'El nombre completo es obligatorio';
        isValid = false;
      }

      if (!email) {
        document.getElementById('email-error').textContent = 'El correo electrónico es obligatorio';
        isValid = false;
      } else if (!validateEmail(email)) {
        document.getElementById('email-error').textContent = 'Formato de correo electrónico inválido';
        isValid = false;
      }

      if (!password) {
        document.getElementById('password-error').textContent = 'La contraseña es obligatoria';
        isValid = false;
      } else if (!validatePassword(password)) {
        document.getElementById('password-error').textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
        isValid = false;
      }

      if (password !== confirmPassword) {
        document.getElementById('confirmPassword-error').textContent = 'Las contraseñas no coinciden';
        isValid = false;
      }

      if (!termsAccepted) {
        document.getElementById('termsAccepted-error').textContent = 'Debes aceptar los términos y condiciones';
        isValid = false;
      }

      // Actualizar el estado del botón de envío
      updateSubmitButtonState();

      if (isValid) {
          localStorage.setItem("fullName", document.getElementById("fullName").value);
          localStorage.setItem("email", document.getElementById("email").value);
          localStorage.setItem("dateOfBirth", document.getElementById("dateOfBirth").value);

              // Mostrar alerta antes de redirigir
            alert("Formulario enviado correctamente");

          window.location.href = "confirmacion.html"; // Redirigir a la página de confirmación
      }
    });

    // Validación del correo electrónico en el evento blur
    document.getElementById('email').addEventListener('blur', function() {
      const email = this.value.trim();
      if (!validateEmail(email)) {
        document.getElementById('email-error').textContent = 'Formato de correo electrónico inválido';
      } else {
        document.getElementById('email-error').textContent = ''; // Limpiar el mensaje de error si es válido
      }
      // Actualizar el estado del botón de envío
      updateSubmitButtonState();
    });

    // Agregar eventos de entrada para validar en tiempo real
    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', updateSubmitButtonState);
    });
  });
