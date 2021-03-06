"""empty message

Revision ID: 69212f481a6a
Revises: 05de9f3a1364
Create Date: 2020-05-07 15:32:50.667076

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '69212f481a6a'
down_revision = '05de9f3a1364'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('administrators',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('position', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_unique_constraint(None, 'orders', ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'orders', type_='unique')
    op.drop_table('administrators')
    # ### end Alembic commands ###
