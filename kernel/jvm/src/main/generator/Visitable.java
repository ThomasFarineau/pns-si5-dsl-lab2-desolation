package fr.unice.polytech.desolation.kernel.generator;

public interface Visitable {
	public void accept(Visitor visitor);
}
