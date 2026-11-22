import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
   readonly features = [
    {
      icon: '◷',
      title: 'Agendamentos inteligentes',
      description:
        'Organize os horários, acompanhe os atendimentos e evite conflitos na agenda.'
    },
    {
      icon: '✂',
      title: 'Gestão de barbeiros',
      description:
        'Gerencie sua equipe, disponibilidade e horários de trabalho em um só lugar.'
    },
    {
      icon: '♙',
      title: 'Gestão de clientes',
      description:
        'Mantenha as informações dos seus clientes organizadas e acessíveis.'
    },
    {
      icon: '▤',
      title: 'Catálogo de serviços',
      description:
        'Cadastre serviços, defina preços e apresente suas opções aos clientes.'
    }
  ];

  readonly benefits = [
    'Agenda organizada em tempo real',
    'Controle da disponibilidade dos barbeiros',
    'Gestão centralizada da barbearia',
    'Mais praticidade no dia a dia'
  ];

  onLoginClick(): void {
    console.log('Login será implementado posteriormente.');
  }
}
