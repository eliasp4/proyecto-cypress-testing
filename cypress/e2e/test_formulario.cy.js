describe('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/public/index.html');
  });

  it('Valida campos obligatorios', () => {
    cy.get('button[type="submit"]').click();
    cy.get('#fullName-error').should('contain', 'El nombre completo es obligatorio');
    cy.get('#email-error').should('contain', 'El correo electrónico es obligatorio');
    cy.get('#password-error').should('contain', 'La contraseña es obligatoria');
    cy.get('#termsAccepted-error').should('contain', 'Debes aceptar los términos y condiciones');
  });

  it('Valida formato de correo electrónico', () => {
    cy.get('#email').type('correo_invalido').blur();
    cy.get('#email-error').should('contain', 'Formato de correo electrónico inválido');
  });

  it('Valida requisitos de contraseña', () => {
    cy.get('#password').type('contraseñadebil');
    cy.get('button[type="submit"]').click();
    cy.get('#password-error').should('contain',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
  });

  it('Valida que las contraseñas coincidan', () => {
    cy.get('#password').type('ContraseñaValida123');
    cy.get('#confirmPassword').type('ContraseñaDiferente123');
    cy.get('button[type="submit"]').click();
    cy.get('#confirmPassword-error').should('contain', 'Las contraseñas no coinciden');
  });

  it('Valida que los términos y condiciones estén aceptados', () => {
    cy.get('#fullName').type('Usuario Prueba');
    cy.get('#email').type('usuario@prueba.com');
    cy.get('#password').type('ContraseñaValida123');
    cy.get('#confirmPassword').type('ContraseñaValida123');
    cy.get('button[type="submit"]').click();
    cy.get('#termsAccepted-error').should('contain', 'Debes aceptar los términos y condiciones');
  });

  it('Envía el formulario correctamente y muestra alerta', () => {
    cy.get('#fullName').type('Usuario Prueba');
    cy.get('#email').type('usuario@prueba.com');
    cy.get('#password').type('ContraseñaValida123');
    cy.get('#confirmPassword').type('ContraseñaValida123');
    cy.get('#termsAccepted').check();
    
    // Stub the window.alert function
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    
    cy.get('button[type="submit"]').click();
    
    // Assert that the alert was called with the expected message
    cy.get('@alertStub').should('be.calledWith', 'Formulario enviado correctamente');
  });

  it('Verifica la funcionalidad de mostrar/ocultar contraseña', () => {
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('#toggle-password').click();
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('#toggle-password').click();
    cy.get('#password').should('have.attr', 'type', 'password');
  });

  it('El botón de envío debe estar deshabilitado si hay errores de validación', () => {
    cy.get('button[type="submit"]').should('be.disabled'); // Verifica que el botón esté deshabilitado inicialmente

    cy.get('#fullName').type('Usuario Prueba');
    cy.get('#email').type('correo_invalido'); // Introducir un correo inválido
    cy.get('button[type="submit"]').should('be.disabled'); // El botón debe seguir deshabilitado

    cy.get('#email').clear().type('usuario@prueba.com'); // Corregir el correo
    cy.get('#password').type('ContraseñaValida123'); // Introducir una contraseña válida
    cy.get('#confirmPassword').type('ContraseñaValida123'); // Confirmar la contraseña
    cy.get('#termsAccepted').check(); // Aceptar términos

    cy.get('button[type="submit"]').should('not.be.disabled'); // Ahora el botón debe estar habilitado
  });

  it('Debería redirigir a la página de confirmación tras un registro exitoso', () => {
    cy.get('#fullName').type('Nombre de Prueba');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('Password123');
    cy.get('#confirmPassword').type('Password123');
    cy.get('#termsAccepted').check();

    // Stub the window.alert function to prevent it from blocking the test
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('button[type="submit"]').click();

    // Check if the alert was called (optional, but good practice)
    cy.get('@alertStub').should('be.calledWith', 'Formulario enviado correctamente');

    // Here, you should assert that the URL has changed to the confirmation page
    cy.url().should('include', 'confirmacion.html');

    // Optionally, you can assert that the confirmation page contains certain elements
    cy.contains('¡Registro Exitoso!').should('be.visible');
  });
});
